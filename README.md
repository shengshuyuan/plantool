# Plantool · 今日清单

Plantool 是一个单页日计划工具，帮助“待办很多，却不知道今天该先做什么”的人，把一天收敛成 **1 项最重要任务、3 项中等任务和 5 项小任务**，再结合时间预算记录投入与复盘。

适合个人工作、学习和家庭事务安排。它把重点、耗时和结果放在一张清单里，便于当天执行，晚上回看。

![今日清单从规划到复盘的流程](docs/images/project-overview.svg)

*功能流程示意，非界面截图。*

## 核心能力

- **安排优先级**：按 1 / 3 / 5 分组添加任务，另有“其他任务”记录临时事项。
- **核对时间**：设置当天可用时间预算，填写预计和实际耗时，对比总投入。
- **记录完成**：标记完成，查看当日统计与反馈。
- **每日复盘**：写下复盘文字，按日期回看历史记录。
- **分享清单**：把当前清单导出为 PNG 图片。

## 一个简单用法

早上先填写可用时间，选出当天最重要的一件事，再补充中等任务与小任务。执行时记录实际耗时，结束后写一句复盘；需要留存或分享时导出清单图片。

## 本地运行

使用符合 Vite 7 要求的 Node.js 版本（20.19+ 或 22.12+）。

```bash
git clone https://github.com/shengshuyuan/plantool.git
cd plantool
npm ci
npm run dev
```

打开 Vite 输出的本地地址。

```bash
npm run lint       # ESLint 检查
npm run build      # TypeScript 检查与生产构建
npm run preview    # 预览构建产物
```

技术栈为 React 19、TypeScript、Vite 与 Tailwind CSS；清单图片通过 `html-to-image` 导出。

## 数据与当前边界

任务、时间预算和复盘按日期保存在当前浏览器的 localStorage，不需要账号，也没有跨设备云同步。清除站点数据会影响记录；导出的 PNG 适合阅读留存，不能作为可重新导入的数据备份。

当前工具侧重单人的日清单，不包含团队协作、日历同步或自动计时。原始产品设想见 [PRD.md](PRD.md)，以现有代码行为为准。

| 入口 | 用途 |
| --- | --- |
| [src/App.tsx](src/App.tsx) | 日清单布局、任务分组与图片导出 |
| [useTaskManager.ts](src/hooks/useTaskManager.ts) | 日期切换、任务和本地保存 |
| [src/components/](src/components/) | 时间预算、统计与复盘组件 |
