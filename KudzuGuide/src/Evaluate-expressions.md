# Построение и вычисление выражений с помощью пользовательских операторов

```kotlin
package com.github.KuzyaGlebkin

import com.copperleaf.kudzu.parser.ParserContext
import com.copperleaf.kudzu.parser.expression.ExpressionParser
import com.copperleaf.kudzu.parser.expression.Operator
import com.copperleaf.kudzu.parser.value.IntLiteralParser

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

fun main() {
    val expressionParser = ExpressionParser<Int>(
        termParser = { IntLiteralParser() },

        // precedence — приоритет
        Operator.Infix(op = "+", precedence = 40) { l, r -> l + r },
        Operator.Infix(op = "-", precedence = 40) { l, r -> l - r },
        Operator.Infix(op = "*", precedence = 60) { l, r -> l * r },
        Operator.Infix(op = "/", precedence = 60) { l, r -> l / r },

        Operator.Prefix(op = "-", precedence = 80) { r -> -r },
        Operator.Infixr(op = "^", precedence = 70) { l, r -> l.pow(r) },
    )

    val (node, remainingText) = expressionParser.parse(ParserContext.fromString("2 ^ ((4 - 2) * 2) + 2 ^ (-3)", skipWhitespace = true))
    val value = expressionParser.evaluator.evaluate(node)
    println(value == 16)
}
```
