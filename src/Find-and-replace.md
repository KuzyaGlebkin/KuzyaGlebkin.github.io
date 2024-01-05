# Найти и заменить структурированные последовательности текстом

```kotlin
package com.github.KuzyaGlebkin

import com.copperleaf.kudzu.parser.ParserContext
import com.copperleaf.kudzu.parser.SourcePosition
import com.copperleaf.kudzu.parser.chars.CharInParser
import com.copperleaf.kudzu.parser.choice.PredictiveChoiceParser
import com.copperleaf.kudzu.parser.many.ManyParser
import com.copperleaf.kudzu.parser.mapped.MappedParser
import com.copperleaf.kudzu.parser.sequence.SequenceParser
import com.copperleaf.kudzu.parser.text.IdentifierTokenParser
import com.copperleaf.kudzu.parser.text.ScanParser

fun main() {
    val variableMap = mapOf(
        "asdf" to "first",
        "qwerty" to "second",
    )

    val patternToReplace = MappedParser(
        SequenceParser(
            CharInParser('#'),
            CharInParser('{'),
            IdentifierTokenParser(),
            CharInParser('}'),
        )
    ) {
        val (_, _, identifier, _) = it.children
        variableMap[identifier.text]
    }

    val findAndReplaceParser = ManyParser(
        PredictiveChoiceParser(
            patternToReplace,
            ScanParser(patternToReplace),
        )
    )

    val (node, remainingText) = findAndReplaceParser.parse(ParserContext.fromString("the value of #{asdf} is 1, but #{qwerty} is 2"))
    println(node.text)
}
```
