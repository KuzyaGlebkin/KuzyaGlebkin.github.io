# Детали реализации

В Kudzu синтаксический анализатор - это класс, который расширяет `Parser` и реализует 2 метода: `predict`, и `parse`. `predict` это метод, который проверяет, способен ли анализатор использовать следующий символ, и parse фактически реализует логику синтаксического анализа и возвращает `Node`.

Существует два типа узлов (нод), `TerminalNode` и `NonTerminalNode`. `TerminalNode` обычно содержит необработанный текст, который был распарсен из входных данных, в то время как a `NonTerminalNode` содержит другие узлы. Таким образом, нетерминальные узлы составляют внутренние узлы дерева синтаксического анализа[^1], в то время как терминальные узлы составляют листья дерева синтаксического анализа.

В отличие от некоторых других библиотек синтаксического анализа, Kudzu не накладывает никаких ограничений на тип узла, создаваемого анализатором, чтобы свести параметры типа к минимуму, а читаемость кода - к максимуму. Вместо оценки дерева синтаксического анализа путем работы с определенными подклассами, оценка выполняется просто на основе знания того, является ли узел терминальным или нетерминальным узлом, и имени узла. Существуют API, помогающие перемещаться по дереву синтаксического анализа и находить определенные узлы на основе их типа или имени.

API-интерфейсы разработаны таким образом, что каждый шаг полностью изолирован, так что код для одного шага можно легко заменить или повторно использовать по мере необходимости, обеспечивая большую гибкость, сохраняя при этом код для каждой фазы чистым и легким для понимания. Общий процесс синтаксического анализа и оценки текста с помощью Kudzu заключается в следующем:

> 1) `String`
> 2) `ParserContext`
> 3) `Parser.parse(ParserContext) -> Pair<Node, ParserContext>`
> 4) `Node.visit([Visitor]) -> Unit`

1. Текстовая строка, которая должна быть проанализирована.
2. Предоставляет единый API для синтаксических анализаторов, позволяющий использовать отдельные символы. Отслеживает позицию источника.
3. Каждая грамматика имеет единственное корневое правило, которое определяется как простой экземпляр `Parser`. Результатом является единственный корневой узел и ParserContext, представляющий текст, который остается неиспользованным. Ожидается, что успешный синтаксический анализ вернет пустой ParserContext. Этот корневой анализатор будет рекурсивно вызывать тот же метод для других объектов анализатора, каждый из которых создает узлы в дереве и продвигает позицию в ParserContext.
4. Узел может посещать любое количество объектов-посетителей (Visitor objects), которые распознают и оценивают отдельные узлы в дереве синтаксического анализа.


[^1]: в оригинале — parse tree, в отличии от термина abstract syntax tree обозначает дерево, которое содержит **все** символы, которые были в тексте, например [тут](./Find-and-replace.md) видно, что `it.children` возвращает всех потомков, а не только нужный нам идентификатор `val (_, _, identifier, _) = it.children`
