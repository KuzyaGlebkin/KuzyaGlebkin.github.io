# Вычисление деревьев синтаксического анализа

После создания полного анализатора и преобразования текста в AST[^1] мы можем теперь оценить его. Оценка AST состоит из Visitor.Callback или простого обратного вызова лямбды. Ниже приведен базовый пример использования вымышленной грамматики:

```kotlin
val parser = constructParser()

val (node, _) = parser.parse(input)

// simple visiting, such as finding all nodes of a particular type and not caring about the structure
node.visit { node ->
    // do something with each node as it is entered in the tree
}

// alternatively, visit with a full set of callbacks to also introspect the parse-tree's structure
node.visit(object : Visitor.Callback {
    var depth: Int = 0
    override fun enter(node: Node) {
        depth++
    }
    override fun exit(node: Node) {
        depth--
    }
    override fun onStart() { }
    override fun onFinish() { }
})
```

А вот уже мой пример, который использует грамматику из прошлых примеров. Носколько такой пример корректен — не знаю.

```kotlin
package com.github.KuzyaGlebkin

import com.copperleaf.kudzu.node.Node
import com.copperleaf.kudzu.visitor.Visitor
import com.copperleaf.kudzu.parser.ParserContext
import com.copperleaf.kudzu.parser.expression.ExpressionParser
import com.copperleaf.kudzu.parser.expression.Operator
import com.copperleaf.kudzu.parser.value.IntLiteralParser
import com.copperleaf.kudzu.visit

fun Int.pow(exponentVal: Int): Int {
    val base = this
    var exponent = exponentVal
    var result: Int = if (exponentVal >= 0) { 1 } else { 0 }

    while (exponent > 0) {
        result *= base
        exponent -= 1
    }

    return result
}
fun constructParser() : ExpressionParser<Int> {
    return ExpressionParser<Int>(
        termParser = { IntLiteralParser() },

        // precedence — приоритет
        Operator.Infix(op = "+", precedence = 40) { l, r -> l + r },
        Operator.Infix(op = "-", precedence = 40) { l, r -> l - r },
        Operator.Infix(op = "*", precedence = 60) { l, r -> l * r },
        Operator.Infix(op = "/", precedence = 60) { l, r -> l / r },

        Operator.Prefix(op = "-", precedence = 80) { r -> -r },
        Operator.Infixr(op = "^", precedence = 70) { l, r -> l.pow(r) },
    )
}

fun main() {
    val parser = constructParser()
    val input = ParserContext.fromString("2 ^ ((4 - 2) * 2) + 2 ^ (-3)", skipWhitespace = true)

    val (node, _) = parser.parse(input)

// simple visiting, such as finding all nodes of a particular type and not caring about the structure
    node.visit { node ->
        println(node)
    }

// alternatively, visit with a full set of callbacks to also introspect the parse-tree's structure
    node.visit(object : Visitor.Callback {
        var depth: Int = 0
        override fun enter(node: Node) {
            depth++
        }
        override fun exit(node: Node) {
            depth--
        }
        override fun onStart() { }
        override fun onFinish() { }
    })
}
```

[^1]: До этого говорилось, что Кудзу не создает абстрактное синтаксическое дерево, что тут имелось в виду спрошу у автора
