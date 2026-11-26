# Interface copy

Read before writing or editing interface text. The governing rule is principle 5: words carry only what the reader does not already know.

## What a string may carry

Names, times and dates, amounts, IDs and codes, status, and warnings the reader must act on. A heading names the section in one to three words. Everything else needs a reason the screen cannot give by form or position.

## Say the conclusion

As the positive half of the rule, write the conclusion the reader would otherwise have to work out by comparing dates, doing arithmetic or inferring scope. A must-act sentence states what, by when, the consequence, and what is still fine, in one or two plain sentences, using only given facts. Never present a derived date or number as a fact; if a derived value helps, show the arithmetic. When a deadline falls today, state the time remaining next to the clock time ("until 16:30 · 50 min left").

| Before | After |
|---|---|
| "Card expires 03/27. Next payments: 12 Mar 2027, 12 Apr 2027." | "Your card covers the 12 Mar payment but not the 12 Apr one. Update it before 12 Apr." |
| "Next charge: $168.00" (where does it come from?) | "$168.00 on 12 Mar · 14 seats × $12" |
| 「2 本书 5/14 到期。可续借 1 次，续借后到期日 5/28。」 | 「2 本书明天（5/14）到期，还能续借一次，续借后可借到 5/28。」 |

Deleting filler must not delete the one sentence that saves the reader a calculation or a comparison.

## Delete these

| Pattern | English example | Chinese example | Replace with |
|---|---|---|---|
| How to use the interface | "Tap a card to see details" | 「点击卡片查看详情」 | Nothing; a chevron or tappable row says it |
| Narrating what is visible | "Below are your upcoming bookings" | 「以下是你的预订」 | A heading: "Bookings" / 「预订」 |
| Promising sync or magic | "Changes sync automatically" | 「修改会自动同步」 | Nothing, or a status: "Saved" / 「已保存」 |
| Marketing voice | "Effortlessly manage your seamless workflow" | 「一键开启高效之旅」 | The plain fact, or nothing |
| Exclamation | "All set!" | 「搞定啦！」 | "Done" / 「已完成」 |
| Chatty filler | "Just a heads-up:", "Simply" | 「温馨提示：」「小贴士：」 | The warning itself |
| Counting what the reader sees | "3 items" above three visible items | 「共 3 项」 | Nothing |
| Repeating the nav label as a page title | Tab "Settings", page h1 "Settings" | 标签「设置」，页标题又是「设置」 | A visually hidden heading |
| Disclaimers sprinkled per item | "For reference only" under every chart | 每张图下都写「图仅供参考」 | One line in a legend or a credits page |
| Advice nobody asked for | "Remember to stay hydrated" in a schedule | 日程里写「记得多喝水」 | Nothing |

`scripts/lint-copy.mjs` flags most of these. The pattern lists live in one array at the top of the script; add to it when a new smell recurs.

## Register

- Plain written language: what a careful colleague would write in a note, not a chatbot or an advert.
- Statements, not questions or invitations ("No bookings today", not "Looking for bookings?").
- Second person only when needed; most labels need no pronoun.
- One clause where possible. A sentence over about 20 words or 40 Chinese characters usually belongs in a detail layer.
- Messages written for the owner to send to someone else (a host, a client): a short paragraph with only what the recipient needs, not a bulleted list and not background they did not ask for.

## Buttons and links

- Shortest verb that names the result: Copy, Call, Navigate, Save, Send, Done / 复制、拨号、导航、保存、发送、完成.
- Name the action on confirmations: "Delete 3 files", not "OK" / 「删除 3 个文件」，不是「确定」.
- A link is the destination's name: "Refund policy", not "Click here" / 「退款规则」，不是「点击这里」.
- Toggle labels state the setting, not the action: "Notifications" with a switch, not "Turn on notifications".

## Numbers, time, dates

- One format per kind across the product. Pick and write it in `DESIGN-NOTES.md`: e.g. 24-hour `14:30`, dates `12/8 Tue` or `12月8日 周二`, durations `1 h 30 min` or `1小时30分`.
- Tabular figures wherever numbers align in columns or update in place (`font-variant-numeric: tabular-nums`).
- A monospaced face only for codes the reader copies or reads out (booking IDs, confirmation codes) and for aligned time columns.
- Relative time ("in 1 h 30 min") only for the next item; absolute time elsewhere.
- Ranges for variable values: "about 25 min (allow 40)" / 「约 25 分钟（雪天留 40）」.
- Mark unverified values: "about", "unconfirmed" / 「约」「待确认」.
- Money: currency symbol once per context, thousands separators, no trailing `.00` unless cents matter.

## Terminology

- Use the reader's everyday word, not the data source's, the industry's, or a foreign-language term carried over. Test: would the reader say this word aloud to a friend?
- One term per concept across the whole product. If the booking flow says "reservation", the receipt does not say "order".
- When two values look contradictory (planned time vs. deadline), label each by what it is rather than adding a paragraph that explains the difference.

## Mixed Chinese and Latin text

- Space between Chinese and Latin letters or digits. Prefer `text-autospace: normal` (with a manual fallback) over typed spaces, and turn it off for codes, monospaced text and Japanese.
- Chinese punctuation is full-width (，。：；「」); Latin punctuation inside Latin runs. Choose one quotation style per product.
- Do not italicise Chinese. Avoid synthesised bold (`font-synthesis-weight: none`); use a real weight.
- `line-break: strict` and `text-spacing-trim: trim-start` for cleaner line starts; justify long Chinese prose only, with a max width of about 40em.
- Font stack: a Latin face for Latin and digits first, then the system Chinese face (PingFang SC, then Noto Sans SC). Loading a Chinese webfont is rarely worth its size.
- Pick one separator per meaning and use it everywhere (e.g. ` · ` for "same place, several parts", ` → ` for "from here to there").
- A Chinese label is usually shorter than its English counterpart; check layouts in both if the product ships both.
