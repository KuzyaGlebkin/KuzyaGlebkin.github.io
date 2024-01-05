# Объединение нескольких парсеров

```kotlin
package com.github.KuzyaGlebkin

import com.copperleaf.kudzu.parser.ParserContext
import com.copperleaf.kudzu.parser.chars.CharInParser
import com.copperleaf.kudzu.parser.chars.DigitParser
import com.copperleaf.kudzu.parser.many.AtLeastParser
import com.copperleaf.kudzu.parser.mapped.MappedParser
import com.copperleaf.kudzu.parser.maybe.MaybeParser
import com.copperleaf.kudzu.parser.sequence.SequenceParser

fun main() {
    val intLiteralParser = MappedParser(
        SequenceParser(
            MaybeParser(
                CharInParser('-')
            ),
            AtLeastParser(
                DigitParser(),
                minSize = 1
            )
        )
    ) { it.text.toInt() }

    val (node, remainingText) = intLiteralParser.parse(ParserContext.fromString("-123"))
    val parsedValue: Int = node.value
    println(parsedValue==-123)
}
```
