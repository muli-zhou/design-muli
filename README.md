# design-muli

A design skill for Claude Code and other Claude agents.

一个用于 Claude Code 和其他 Claude 代理的设计 skill。

## What it is

design-muli helps an agent design, improve, revise and review user interfaces (web, mobile, desktop) and graphic layouts (decks, reports, portfolios, posters, one-pagers). Before any visual work, the agent writes down a visual anchor (the project's own design system or brand guide, a public system the owner names, or the skill's default tokens) and a Never list of prohibitions with reasons. Before designing any screen, it models the system: objects, tasks, states and navigation.

The skill also contains 12 principles, each with a check to run on a render; a list of AI tells, the default-kit look that readers recognise as generated; motion rules by role and size; a craft floor of checkable minimums; design and copy lints; and a script that renders every state and overlay from scripted steps. Reviews follow a gate in three tiers. For larger changes the gate ends with a cold read by a fresh reader and a taste review against the anchor. Corrections from the owner can be added to the skill as lessons.

The 12 principles: job first; triggers first, then frequency; one protagonist, seen first; say it once; words carry only what the reader does not know; make grouping visible; three layers for long content; navigation and primary actions stay reachable; one pattern per situation, one meaning per control; certainty is visible; real imagery or none; every fact is verified.

design-muli 帮助代理设计、改进、修改和评审用户界面（网页、移动端、桌面端）以及平面排版（幻灯片、报告、作品集、海报、单页）。做任何视觉工作之前，代理先写下视觉锚点（项目自己的设计系统或品牌手册、所有者指定的公开设计系统，或本 skill 的默认令牌），以及一份附有理由的禁用清单。设计任何界面之前，它先为系统建模：对象、任务、状态和导航。

skill 里还有 12 条原则，每条都附有在渲染图上执行的检查；一份 AI 味特征清单，即读者一眼认出是生成的默认套件观感；按角色和尺寸定的动效规则；一套可检查的工艺底线；设计和文案两个 lint 脚本；以及一个按预设步骤渲染每个状态和浮层的脚本。评审按三档关卡进行。较大的改动最后要由新读者做冷读，并对照锚点做品味审查。所有者（项目主人）的纠正可以作为经验条目加入 skill。

12 条原则：任务优先；先来意，再频率；一个主角，第一眼看到；只说一次；文字只承载读者不知道的东西；让分组看得见；长内容分三层；导航和主要操作始终够得着；一种情境一种模式，一个控件一种含义；确定程度要看得见；只用真实图像；每个事实都要核实。

## Install

```
git clone https://github.com/muli-zhou/design-muli ~/.claude/skills/design-muli
```

Update with `git pull` inside that folder.

The two scripts are optional. `shot.mjs` needs a locally installed Chrome, Chromium or Edge, and Node 22+ for full-page and phone-width captures, `--steps` and `--emulate-reduced-motion` (older Node falls back to viewport-only captures). The skill works without them if you supply screenshots another way.

```
git clone https://github.com/muli-zhou/design-muli ~/.claude/skills/design-muli
```

在该文件夹里运行 `git pull` 即可更新。

两个脚本是可选的。`shot.mjs` 需要本机安装的 Chrome、Chromium 或 Edge；整页截图、手机宽度截图、`--steps` 和 `--emulate-reduced-motion` 需要 Node 22+（更旧的 Node 只能截可视区域）。不用这两个脚本也可以，只要用别的方式提供截图。

## Use

The skill triggers on design requests, in English or Chinese. It can also be invoked directly with `/design-muli`.

- **New**: nothing exists yet; write the job, fix the anchor and Never list, ask for real material, model the objects, tasks, states and navigation, agree the structure with the owner, build to the craft floor with motion tokens, review with every state rendered.
- **Improve**: something exists; find its anchor, render it, audit against the principles, AI tells and craft floor, run the lints, propose at most 8 ranked findings, change what the owner picks.
- **Revise**: the owner names a symptom; find the principle it breaks, sweep the whole product for the same problem, fix at the cause.
- **Review only**: render, audit and report, without changing anything.

Example prompts:

- "Redesign the settings page; it feels too dense."
- "Review this poster before I send it to the printer."
- "Here is a screenshot of the dashboard. Nothing stands out. Fix it."

用中文或英文提出设计请求时，这个 skill 会自动触发。也可以用 `/design-muli` 直接调用。

- **新建**：还什么都没有；写清任务，定下锚点和禁用清单，要真实素材，为对象、任务、状态和导航建模，和所有者商定结构，按工艺底线实现、动效只用令牌，渲染每个状态后评审。
- **改进**：已经有成品；找到它的锚点，出图，对照原则、AI 味特征和工艺底线审查，运行 lint，提出最多 8 条排好序的发现，改所有者挑中的几条。
- **修改**：所有者指出一个症状；找到它违反的原则，在整个产品里排查同样的问题，从根源上改。
- **只评审**：出图、审查、出报告，不做任何修改。

示例提示：

- 「重新设计设置页，太密了。」
- 「这张海报送印之前帮我评审一下。」
- 「这是仪表盘的截图，没有东西突出，改一下。」

## Context and cost

- The main file, `SKILL.md`, is about 120 lines.
- Each reference file loads only when its condition is met (for example, `copy.md` before writing interface text, `cold-read.md` at a T2 review). New mode loads `tokens.md`, `flows.md`, `ai-tells.md`, `craft.md` and `motion.md` only when it reaches the step that needs them, and `tokens.md` only when the project has no anchor of its own.
- Reviews come in three tiers. T0 (one string, one spacing value or one colour) is answered from the code; T1 (a section or component) adds the design lint, the craft floor and renders at two sizes, including the states it touches; only T2 (a full screen, page, deck, poster, or any new design) adds a cold read and a taste review. Small changes need neither.
- The lints run before any reader, so readers do not spend time on problems a script can find.
- The cold reader only reports what it perceives, so a small, cheap model is enough; only the taste review needs a strong model.

- 主文件 `SKILL.md` 约 120 行。
- 每个参考文件只在满足条件时加载（例如写界面文字之前加载 `copy.md`，T2 评审时加载 `cold-read.md`）。新建模式走到需要的那一步才加载 `tokens.md`、`flows.md`、`ai-tells.md`、`craft.md` 和 `motion.md`，其中 `tokens.md` 只在项目没有自己的锚点时加载。
- 评审分三档。T0（一处文字、一个间距值或一种颜色）根据代码回答；T1（一个区块或组件）加上设计 lint、工艺底线和两个尺寸的渲染图，包括它涉及的状态；只有 T2（整个界面、页面、幻灯片、海报，或任何新建的设计）才加上冷读和品味审查。小改动两者都不需要。
- lint 在读者之前运行，读者不必在脚本能找到的问题上花时间。
- 冷读者只报告它看到了什么，所以用小而便宜的模型就够了；只有品味审查需要强模型。

## Project notes and lessons

Each project keeps a `DESIGN-NOTES.md` with its job, constraints, anchor, tokens, Never list, assets, decisions and rejected approaches. When the owner corrects a design, the agent decides whether the correction is project-specific (it goes into `DESIGN-NOTES.md`) or general. A general correction becomes a proposed lesson; it is added to `LESSONS.md` only after the owner approves it. At about 20 lessons, or when two lessons contradict a principle, they are consolidated into the principles (procedure in `references/evolve.md`). Nothing is committed or pushed automatically.

每个项目保存一份 `DESIGN-NOTES.md`，记录任务、约束、锚点、令牌、禁用清单、素材、决定和被否定的做法。所有者纠正设计时，代理判断这次纠正是项目特有的（写进 `DESIGN-NOTES.md`）还是通用的。通用的纠正成为一条待批准的经验条目，所有者批准后才加入 `LESSONS.md`。累积到约 20 条，或有两条与某条原则矛盾时，把它们合并进原则（步骤见 `references/evolve.md`）。不会自动提交或推送。

## Files

```
SKILL.md                  main file: modes, anchor step, attention budget, 12 principles, review gate
assets/tokens.css         default tokens, light and dark, ready to paste
references/tokens.md      what each default token is for, and what not to use it for
references/ai-tells.md    the default-kit look, what to do instead, how to check
references/craft.md       the craft floor: numbered, checkable minimums
references/flows.md       the model (objects, tasks, state table, navigation) and interaction rules
references/motion.md      easing by role, duration by size, choreography, interruptibility, checks
references/graphic.md     document pages and attract pages: grid, type, charts, posters
references/principles.md  each principle: rule, why, a failure example, checks
references/copy.md        interface copy rules, before/after examples, mixed Chinese and Latin text
references/platforms.md   web layout values, native and desktop app notes
references/cold-read.md   review tiers, rendering, lint, cold-read and taste-review briefs, triage
references/evolve.md      DESIGN-NOTES.md template, lessons, consolidation
scripts/shot.mjs          renders full-page PNGs at several widths with local Chrome;
                          --steps clicks, types and bursts frames to render states and overlays
scripts/lint-design.mjs   flags off-spec values and default-kit tells
scripts/lint-copy.mjs     flags copy smells and facts repeated 3 or more times
LESSONS.md                approved lessons waiting to be consolidated
CHANGELOG.md              what changed in each version, and why
VERSION                   current version
zh/                       Chinese mirror for human readers: SKILL.zh.md, references/ (all eleven),
                          LESSONS.md, CHANGELOG.md; same file names, SKILL.md -> zh/SKILL.zh.md
```

```
SKILL.md                  主文件：模式、锚点步骤、注意力预算、12 条原则、评审关卡
assets/tokens.css         默认令牌，浅色和深色，可以直接粘贴
references/tokens.md      每个默认令牌用于什么、不用于什么
references/ai-tells.md    默认套件的观感、改用什么、怎么检查
references/craft.md       工艺底线：编号、可检查的最低要求
references/flows.md       模型（对象、任务、状态表、导航）和交互规则
references/motion.md      按角色选缓动、按尺寸定时长、编排、可打断、检查
references/graphic.md     文档型页面和吸引型页面：网格、字体、图表、海报
references/principles.md  每条原则：规则、理由、失败示例、检查项
references/copy.md        界面文案规则、改前改后示例、中英文混排
references/platforms.md   网页布局数值，原生应用和桌面应用说明
references/cold-read.md   评审分档、出图、lint、冷读和品味审查的简报、分级
references/evolve.md      DESIGN-NOTES.md 模板、经验条目、合并
scripts/shot.mjs          用本机 Chrome 按几个宽度渲染整页 PNG；
                          --steps 执行点击、输入和连拍，渲染各个状态和浮层
scripts/lint-design.mjs   标出不合规格的数值和默认套件的特征
scripts/lint-copy.mjs     标出文案毛病和重复 3 次及以上的事实
LESSONS.md                已批准、等待合并的经验条目
CHANGELOG.md              每个版本改了什么、为什么改
VERSION                   当前版本
zh/                       供人阅读的中文对照版：SKILL.zh.md、references/（全部十一个）、
                          LESSONS.md、CHANGELOG.md；文件名相同，SKILL.md -> zh/SKILL.zh.md
```

The model loads only the English files. The `zh/` folder is a translation for people to read and compare; `assets/` and `scripts/` have no mirror.

模型只加载英文文件。`zh/` 文件夹是给人阅读和对照的译文；`assets/` 和 `scripts/` 没有对照版。

## Scope

design-muli covers the design itself: structure, interaction, visual language, copy and review. Producing icon sets, logos, illustration or complex data visualisation, and operating design tools, are outside it; use a dedicated tool for those and hold the result to the same anchor.

design-muli 负责设计本身：结构、交互、视觉语言、文案和评审。制作图标集、标志、插画或复杂的数据可视化，以及操作设计工具，不在它的范围内；这些用专门的工具来做，产出同样遵守锚点。

## Licence

MIT. See `LICENSE`.

MIT 许可证。见 `LICENSE`。

## Acknowledgements

With reference to the Geist design system, the Vercel Web Interface Guidelines, and the Vibe Design Tips series.

参考了 Geist 设计系统、Vercel Web Interface Guidelines 和 Vibe Design Tips 系列。
