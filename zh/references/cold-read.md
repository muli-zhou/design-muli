English original: ../../references/cold-read.md · 对照译文，供人阅读

# 冷读与品味审查

设计者刚做完一个界面，没法用新鲜的眼光看它，因为他知道每个元素的用途。冷读把渲染图交给一位读者，他只知道自己是谁、来做什么，然后记录他实际看到了什么。之后的品味审查请第二位、能力更强的读者判断：结果看起来是为这个产品做的，还是套了模板。

## 选档

档位越高，成本越高；选能覆盖这次改动的最低一档。

| 档 | 改动 | 做什么 |
|---|---|---|
| T0 | 一处文字、一个间距值或一种颜色 | 根据代码和这次改动回答 SKILL.md 里的关卡问题。不需要出图。 |
| T1 | 一个区块或一个组件 | 运行 `scripts/lint-design.mjs`，对改动部分检查 `craft.md` 的底线，对照 `ai-tells.md` 检查改动部分，并在最小和最大目标尺寸的真实渲染图上回答关卡问题，包括这次改动涉及的每个浮层和状态。 |
| T2 | 整个界面、页面、海报、一组幻灯片，或任何新建的设计 | 先运行 `scripts/lint-design.mjs`，再出所有目标尺寸的真实渲染图（包括每个浮层和状态表里的每个状态），由新读者做冷读，分级处理，最后做品味审查。 |

改动涉及导航、区块之间的分组或首屏时，提高一档。

## 出图

- 网页：`node scripts/shot.mjs <url|file> --widths 375,768,1280 --out shots/<label>`。产品有深色模式就加 `--dark`。检查可达性时加 `--viewport --scroll bottom`，截取读者滚动之后看到的画面。
- 原生和桌面应用：在支持的最小和最大尺寸下，从模拟器或运行中的应用截图。
- 印刷品：按最终尺寸导出 PDF 或 PNG；海报还要另出一版，缩放到从预期距离看的大小（例如 2 米对应 25%）。
- 交出渲染图之前，每一张你都要自己看过。没看过的渲染图不算已验证。

## T2 第 1 步：lint

读者看到渲染图之前，先运行 `node scripts/lint-design.mjs <file>` 和 `node scripts/lint-copy.mjs <file>`。锚点没有要求的命中都改掉，然后再出图。脚本能找到的问题，不要占用读者的注意力。

## T2 第 2 步：给新读者写简报

用一个没有对话上下文的子代理。更小、更便宜的模型就够了，因为读者只报告它看到了什么。只给它渲染图和一句描述读者的话。不要附上设计理由、原则或你改了什么；其中任何一项都会让读者偏向你的意图。

简报模板（发给模型的是英文版；中文版仅供对照）：

```
You are seeing these images for the first time. They are <screens of an app | pages of a website | a poster | slides>.
Imagine you are <who the reader is>, and you came to <what they came to do>.
Images: <paths>, shown at <sizes>. Images <first>–<last> are the states of one task, in order.

Answer each question with what you observe. Do not suggest redesigns, and do not guess at the designer's intent.
1. What do you see in the first 3 seconds? List the first three things your eye lands on, in order.
2. What is this for, in one sentence?
3. Which things belong together? Describe the groups you see.
4. Which words could be deleted with no loss of information? Quote them.
5. What looks tappable or clickable, and what would you tap first?
6. What looks confirmed or decided, and what looks optional or undecided? What tells you?
7. Was there anything you had to read twice, or could not understand?
8. Is anything repeated? Quote each repeated item and where it appears.
9. Walk the task from the first image to the last: at which step were you unsure what had happened or what to do next?

Answer in a numbered list matching the questions. Keep each answer under 60 words.
```

```
你是第一次看到这些图片。它们是 <screens of an app | pages of a website | a poster | slides>。
假设你是 <who the reader is>，来这里是为了 <what they came to do>。
图片：<paths>，显示尺寸为 <sizes>。图片 <first>–<last> 按顺序展示同一个任务的各个状态。

每个问题都按你观察到的回答。不要提出重新设计的建议，也不要猜测设计者的意图。
1. 最初 3 秒你看到了什么？按顺序列出目光最先落到的三样东西。
2. 用一句话说，这是做什么用的？
3. 哪些东西属于同一组？描述你看到的分组。
4. 哪些字删掉也不会损失信息？原样引出来。
5. 哪些看起来可以点按或点击？你会先点哪个？
6. 哪些看起来已确认或已决定，哪些看起来可选或未决定？你根据什么判断？
7. 有没有哪里需要读两遍，或者看不懂？
8. 有没有重复的内容？原样引出每个重复项，并说明出现在哪里。
9. 从第一张图到最后一张，把任务走一遍：在哪一步你不确定发生了什么，或不知道下一步该做什么？

按问题编号逐条回答。每个回答不超过 60 个词。
```

描述读者的话只写一行，例如 "a patient checking tomorrow's appointment on their phone while on a bus"（在公交车上用手机查看明天预约的病人），或 "a conference attendee walking past this poster in a hallway"（在走廊里经过这张海报的参会者）。

## 分级处理

先把读者对问题 1 的回答（最先看到的三样东西）和任务句里的来意对照。如果最先看到的不是某种来意或必须处理的事项，就必须修改，而且是结构性修改：改位置、大小、对比度或主要按钮，只改文字不够。问题 5 同样处理：读者最先会点的应该是主要操作。

读者在问题 9 里指出的每一步也必须修改：改那个状态的反馈或下一步操作（`flows.md`），然后重新渲染那个状态。

读者需要自己推算的内容（比较日期、做算术、推断范围或哪些不受影响）也必须修改。改法是在界面里写出结论（原则 5），不能当作可改可不改的措辞。

然后对每条观察做出判断：

| 观察 | 原则 | 处理 |
|---|---|---|
| 例如「我最先看到的是那个绿色徽标」 | 3 | 修改：徽标改为彩色文字 |
| 例如最先看到的三样是标志、用户名、历史列表，而来意是一本明天到期的书 | 2, 3 | 必须修改：到期的借阅移到顶部条，并带上「续借」按钮 |
| 例如「『12 周』出现在三个地方」 | 4 | 修改：保留标题里那一处 |
| 例如「不确定那一行灰色的是什么」 | 5 或 6 | 修改，或保留并写明理由 |

- 对应某条原则、并且符合任务句的，修改。
- 观察与任务冲突时（读者期待的恰好是这个界面有意不做的事），保留并写明理由。
- 对应不到任何原则的观察，作为候选经验条目（`evolve.md`）。

然后修改并重新出图。如果第一轮做了结构性修改（位置、大小、对比度、分组、新增或移动元素），就换一位新读者做第二轮，检查最先看到的三样东西现在是否与来意相符。只有第一轮仅改了文字时，才可以跳过第二轮。最多两轮；剩下的问题写进报告。

## T2 第 3 步：品味审查

冷读的问题改完之后，由一个强模型（不是做冷读的小模型）把渲染图和锚点对比。给它新的渲染图，并排放上 1–3 张锚点渲染图（产品现有的界面，或参考设计系统、品牌手册里的页面），再附上 `references/ai-tells.md`。其他都不给：不给设计理由，也不给原则。

简报模板（发给模型的是英文版；中文版仅供对照）：

```
Image set A is the reference: <the product's existing screens | the reference design system's own pages>.
Image set B is new work meant to belong with A: <paths>.
The attached list describes common signs of generated, templated design.

Answer only these, citing the element and image:
1. Which elements in B look templated, or unlike A? Say why in one line each (colour, type, spacing, shape, ornament, layout habit).
2. Which items from the attached list appear in B?
Observations only; no redesign.
```

```
图片组 A 是参照：<the product's existing screens | the reference design system's own pages>。
图片组 B 是新做的，要和 A 属于同一产品：<paths>。
附带的清单列出了生成式、套模板设计的常见迹象。

只回答下面两个问题，并指明元素和图片：
1. B 里哪些元素像套模板，或与 A 不一致？每条用一行说明原因（颜色、字体、间距、形状、装饰、布局习惯）。
2. 附带清单里的哪些项出现在 B 里？
只写观察，不做重新设计。
```

逐条处理每个回答：去掉那个元素，或指出要求它的锚点条目。修改，重新出图。默认一轮；只有所有者要求，或第一轮改动了布局时，才做第二轮。

## 没有子代理工具时

只看渲染图，自己完成阅读，并在报告里说明是自己做的。

1. 写完并保存这次改动的笔记，然后放到一边：阅读结束之前，不重读笔记、代码或对话。
2. 写下描述读者的那句话，然后只打开渲染图文件。
3. 在考虑怎么修改之前，先书面回答上面简报里的九个读者问题。描述图上实际有什么，不写你原本想让它是什么。
4. 然后再按上面的方法分级处理。品味审查也一样：拿你的渲染图和锚点渲染图，对照 `ai-tells.md` 比较，并说明是自己做的。

## 报告

- 用了哪一档、渲染了哪些尺寸，每处改动附改前和改后的图。
- lint 命中：已修改，或有锚点依据；冷读和品味审查的发现：已修改、保留（附理由），或最后一轮之后仍未解决。
- 哪些没有验证：真机、实际使用导出文件的应用、实际尺寸的打印、手势和动效的手感、慢速网络、辅助技术。
