English original: ../../references/evolve.md · 对照译文，供人阅读

# 演进

这个 skill 在两个层面上改进：每个项目里保存的笔记，以及修改 skill 本身的经验条目。所有者的纠正会记入这两层。

## 项目层：DESIGN-NOTES.md

在被设计项目的根目录保存一份 `DESIGN-NOTES.md`。每次任务开始时读它。任务改变了决定、令牌或参考时，结束时更新它。每份委派简报都附上其中的相关部分。

最小模板（各节依次是：任务；所有者的约束，即谁会看到、现场必须能用到什么、素材和授权；所有者给的参考；锚点，即来源和链接；令牌，即带角色的颜色、字号和行高、字重、字体、间距、圆角、阴影、控件高度、时长和缓动，以及时间、日期和分隔符的格式；禁用清单，每条禁令附理由；模型，即按 `flows.md` 写的对象、任务、状态、导航，或指向 `FLOWS.md` 的路径；素材，即品牌色、字体、标志、照片或作品图；决定；被否定的做法；待补充事项）：

```markdown
# Design notes

## Job
<one line: who, in what moment, on what medium, to do what>

## Owner's constraints
- Who sees it: <private / team / public>; public channels: <stricter rules, if any>
- Must be usable on site: <IDs, codes, contacts, offline needs>
- Assets and licences: <what the owner allows>

## References the owner gave
- <link or file> - <what to take from it, what not to copy>

## Anchor
- Source: <project design system | Figma file | brand guide | public system the owner named | design-muli default tokens> - <link or path>

## Tokens
- <values, or path to the token file>: colours with roles, type sizes and line heights, weights, fonts, spacing, radii, shadows, control heights, durations and easing
- Formats: time <...>, date <...>, separators <...>

## Never
- <prohibition> - <reason>   (e.g. "no shadow on in-flow cards - grouping is by space")

## Model
- Objects / Tasks / States / Navigation as in `flows.md`, or: <path to FLOWS.md>

## Assets
- Brand colour: <value or none> / Fonts: <files or none> / Logo: <path or none> / Photos or artwork: <path or none>

## Decisions
- <date> <decision> - <why, one line>

## Rejected approaches
- <date> <what was tried> - <why the owner rejected it>

## Open items
- <missing information to collect, removed when filled>
```

所有者批准或否定某项内容时才记一条决定，不必每次编辑都记。新决定取代旧决定时，直接修改旧的那条，不要在下面另加一条与之矛盾的。

## Skill 层：经验条目

所有者否定或纠正设计时，先给这次纠正归类：

- **项目特有**：它取决于这个产品的受众、品牌、内容或约束（「这个应用的用户是临床医生，保留临床术语」）。记进 `DESIGN-NOTES.md` 的 Decisions 或 Rejected approaches 下。
- **通用**：它也适用于其他产品，并且现有原则都没有涵盖，或者某条现有原则导致了错误的结果。这时提出一条经验条目。

一条经验条目有一个标题和四个字段，不含能识别项目的细节（不写产品名、人名、地名、日期、域名或编号）。四个字段依次是：症状，用通用的说法写读者看到或感到了什么；规则，防止问题出现的一行规则；检查，在渲染图或成品上怎样看出来；日期：

```markdown
## <short title>
- Symptom: <what the reader saw or felt, in generic terms>
- Rule: <the one-line rule that prevents it>
- Check: <how to see it on a render or artifact>
- Date: <YYYY-MM-DD>
```

把提出的经验条目给所有者看。所有者同意后，才追加到 skill 文件夹里的 `LESSONS.md`。

## 合并

`LESSONS.md` 达到约 20 条，或者出现两条与某条现有原则矛盾的经验时，把 `LESSONS.md` 合并进 `references/principles.md`。

1. 对每条经验，决定是强化一条现有原则、替换其中一部分，还是新增一条原则（少见；优先合并）。
2. 与现有规则矛盾的经验取代那条规则。删掉旧的措辞，不要两者并存。
3. 规则行有改动时，更新 `SKILL.md` 里每条一行的原则列表。
4. 从 `LESSONS.md` 里删掉已合并的经验。
5. 升级 `VERSION`（语义化版本：措辞改动升补丁号，规则改动或新增升次版本号，工作流程改动升主版本号），并在 `CHANGELOG.md` 里每项改动写一行。
6. 同步更新 `zh/` 下的中文对照版。对照版在 `zh/` 下使用相同的文件名，只有 `SKILL.md` ↔ `zh/SKILL.zh.md` 例外。
7. 检查篇幅上限：`SKILL.md` 最多约 130 行，每个参考文件最多约 250 行。

提交和推送 skill 仓库由所有者决定；把改动准备好，并告知已经就绪。
