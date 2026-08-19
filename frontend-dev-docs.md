# munch-os — Angular

## 目標
從零學 Angular，準備應徵前端職缺（Angular SaaS 產品開發）。用一個「餐飲系統」當練習題材——服務未來自己的餐車，涵蓋庫存管理與顧客點餐流程。

**學習者背景**：有 React 開發經驗，第一次寫 Angular。教學步調已加快，跳過基礎 component 心智模型的重複解釋，直接講 Angular 特有機制。

---

## 對應職缺（JD）

【必要條件】
1. 熟悉任一前端框架（React、Vue、Angular）且 1 年以上開發經驗
2. 精通 HTML、CSS、ES6+，具備基本 UI/UX 概念
3. 熟悉 RESTful API 串接與後端討論 API 規格及資料結構
4. 熟悉任一 UI 元件庫（Material-UI、Ant Design、Element UI 等）
5. 具備英文文件閱讀能力
6. 主動學習新技術，樂於分享

【加分條件】
1. 熟悉瀏覽器開發者工具除錯技巧
2. 具備 TypeScript 開發經驗
3. 了解前端效能優化技巧（元件渲染效能、Bundle 優化、程式碼分割等）
4. 接觸過 CSS 模組化開發經驗，熟悉 BEM 等組織方法
5. 具備任一種後端程式語言及資料庫處理概念
6. 具備大型專案架構與設計經驗（目錄結構規劃、模組化設計、CSS 作用域管理等）或個人作品集

---

## 技術決策 log

| 決策 | 選擇 | 原因 |
|---|---|---|
| Angular CLI 版本 | 19.1.4 | 已安裝，standalone-first |
| Component 架構 | Standalone components（無 NgModule） | v17+ 官方主推寫法 |
| 樣式 | SCSS | 對應加分④ BEM／CSS 模組化，支援 nesting/變數/mixin |
| SSR/SSG | 不啟用 | 這是登入後的內部 SaaS 後台工具，不需要 SEO，先專注核心概念 |
| 專案名稱/資料夾 | `munch-os`（已是 git repo，用 `--directory=. --skip-git` 生成） | |
| 後端 | json-server（暫代真後端） | 對應必要③ RESTful API |
| 英文文件 | 每個新概念附 angular.dev 官方文件連結，要求自己讀 | 對應必要⑤ |
| DevTools 除錯 | 併入階段 3（HttpClient）教，用 Network tab 看 request | 對應加分① |

---

## 路線圖與進度

- [x] **階段 0** — Angular CLI、workspace 結構、第一個 component（對應必要①⑥）
- [x] **階段 1** — Component、Template、Data binding（`{{ }}` interpolation）（對應必要①②）
  - [x] `menu-item` component：`@Input() name/price`（標 TypeScript 型別）、`{{ }}` 顯示
  - [x] `menu-list` component：`menuItems` 陣列、`@for` 迴圈、`[name]`/`[price]` property binding
  - [x] `app.component.html` 掛載 `<app-menu-list>`
- [x] **階段 2** — Service + Dependency Injection（對應必要①、加分⑤概念）
  - [x] `menu.service.ts`：`@Injectable({ providedIn: 'root' })`，`getMenuItems()` 回傳資料
  - [x] `MenuListComponent` 用 constructor injection（`constructor(private menuService: MenuService)`）拿資料，不再寫死陣列
  - [x] `MenuItem` interface 獨立放 `src/app/models/menu-item.model.ts`，service 跟 component 共用
- [x] **階段 3** — HttpClient + json-server 串接 RESTful API（對應必要③；順帶教 DevTools Network tab，對應加分①）
  - [x] 裝 `json-server`（devDependency），`npx json-server --watch db.json --port 3000`（要在專案根目錄執行，不是 `src/app`）
  - [x] `app.config.ts` 加 `provideHttpClient()`
  - [x] `MenuService.getMenuItems()` 改用 `HttpClient.get<MenuItem[]>(url)`，回傳 `Observable<MenuItem[]>`
  - [x] `MenuListComponent` 改用 `.subscribe((data) => { this.menuItems = data; })` 拿資料
  - [x] 驗證：畫面顯示 11 筆真實資料、DevTools Network tab 看到 `GET localhost:3000/menuItems` 200/304
- [x] **階段 4** — Routing（核心部分）（對應加分③部分）
  - [x] `app.routes.ts`：`{ path: '', redirectTo: 'menu', pathMatch: 'full' }`、`/menu` → `MenuListComponent`、`/cart` → `CartComponent`（空殼）
  - [x] `app.component.html` 移除寫死的 `<app-menu-list>`，改用 `<router-outlet />` 渲染
  - [x] `app.component.ts` 的 `imports: []` 只留 template 真正用到的東西（`RouterOutlet`、`RouterLink`），元件不再被父層 import 的話要記得移除，避免無用 import 警告
  - [x] `<nav>` 用 `routerLink` 導覽（不整頁刷新）
  - [x] 剩餘 4 個畫面空殼元件建好並掛路由：`orders/:id`（`OrderTrackingComponent`）、`admin/orders`、`admin/inventory`、`admin/menu`（後三個放在 `src/app/admin/` 子資料夾，對應加分⑥目錄結構規劃）
  - [x] 路由參數：`ActivatedRoute` + `this.route.snapshot.paramMap.get('id')` 讀取 `:id`
  - [ ] Lazy loading（`loadComponent`）刻意延後到階段 9，跟其他效能優化技巧一起
  - 下一步：6 個畫面骨架都在了，之後在階段 5（表單）填 `CartComponent`，階段 6（Angular Material）統一套版
- [x] **階段 5** — Reactive Forms（對應必要②）
  - [x] `CartComponent`：`FormGroup` + `FormControl`（`customerName` 必填、`notes` 選填），`[formGroup]`/`formControlName`/`(ngSubmit)`
  - [x] `onSubmit()` 用 `this.orderForm.valid` 擋無效送出
  - 下一步（之後補強，非本階段必做）：目前訂單表單還沒接上真正的購物車品項與 `POST /orders`，這塊留到串接完整下單流程時再做
- [ ] **階段 6** — Angular Material（UI 元件庫）（對應必要④）
- [ ] **階段 7** — TypeScript 進階（interface、generics、strict mode）（對應加分②，穿插在每階段中）
- [ ] **階段 8** — SCSS 架構／BEM／模組化樣式（對應加分④）
- [ ] **階段 9** — 效能優化（OnPush、trackBy、bundle 分析、code splitting）（對應加分③）
- [ ] **階段 10** — 專案架構收尾（資料夾規劃、README、作品集包裝）（對應加分⑥）

---

## App 畫面規劃

兩種角色、共 6 個畫面，資料靠同一份 json-server（`menuItems` / `orders`，庫存狀態包在 `menuItems[].stockStatus` 裡）串起來。實作時機：階段 4（Routing）。

**顧客端（手機）**
1. 菜單瀏覽 `/menu` — 看菜單、加入購物車，顯示庫存狀態（已售完/補貨中）
2. 購物車／送出訂單 `/cart`
3. 訂單追蹤 `/orders/:id` — 已接單 → 製作中 → 可取餐

**後台／廚房站（平板）**
4. 訂單看板 `/admin/orders` — 新訂單 → 開始製作 → 標記可取餐 → 完成取餐
5. 庫存管理 `/admin/inventory` — 改品項的補貨中/已售完狀態
6. 菜單管理 `/admin/menu` — CRUD 菜單品項、價格

```
顧客流程：菜單瀏覽 → 購物車 → 送出 → 訂單追蹤
後台流程：菜單管理/庫存管理 寫入資料 → 顧客端讀取顯示
         訂單看板 更新狀態 → 顧客訂單追蹤頁同步
```

正式版流程圖：[`docs/user-flow.puml`](./docs/user-flow.puml)（PlantUML，可用 VSCode PlantUML 外掛或 plantuml.com 渲染）

**json-server 資料結構**：[`db.json`](./db.json)（階段 3 會用 `json-server --watch db.json` 啟動假 API）

- `menuItems[].stockStatus`：`"available"` | `"soldOut"` | `"restocking"`（對應截圖的正常/已售完/補貨中）
- `orders[].status`：`"received"` | `"inProgress"` | `"ready"` | `"completed"`（對應廚房看板的三欄 + 顧客追蹤的三段進度條）

---

## 已驗證的關鍵觀念

- React vs Angular：React 是 library（自己選 router/HTTP 套件），Angular 是完整 framework（routing/HTTP/DI/forms 官方統一規格）
- Angular component = `@Component` decorator + class（邏輯）+ `.html`（模板）+ `.scss`（樣式）三檔案
- Selector 是 component 在 HTML 裡的標籤名，要跟使用的地方（如 `index.html` 的 `<app-root>`）字串比對，對不上畫面會空白
- String interpolation `{{ }}`：把 class property 的值塞進模板，等同 React JSX 的 `{value}`，但雙大括號
- Standalone component 用 `imports: []` 自己宣告依賴，不需要 `NgModule`
- `@Input()`：子元件的 class property 加這個裝飾器，代表值由父元件傳入，等同 React 的 props；strict mode 下要給預設值或用 `!` 斷言
- Property binding `[name]="item.name"`：父元件把值「傳進」子元件的 `@Input()`，跟 `{{ }}`（把值顯示成文字）是不同機制
- `@for (item of list; track item.x) { ... }`：新版控制流程語法，取代舊的 `*ngFor`
- 元件不能在自己的 template 裡引用自己（`<app-x>` 出現在 `x.component.html` 裡）——會無限遞迴，跟 React function component return 自己一樣的錯誤
- Dependency Injection：不用像 React hook 主動呼叫，在 constructor 參數寫 `private xxxService: XxxService`，Angular 自動生成並傳入 instance（控制反轉）；`@Injectable({ providedIn: 'root' })` 效果類似 React Context Provider 包在 App 最外層，全 app 共用一份
- 空陣列 `= []` 沒有明確標型別時，TypeScript 會推斷成 `never[]`（不能放任何東西），之後賦值會報型別錯誤——陣列一定要明確標型別，不能靠空陣列讓 TS 自己猜
- interface 不建議寫在 service 檔案裡，應獨立放 `models/` 資料夾（如 `menu-item.model.ts`），service 跟 component 都從同一處 import，避免形狀重複定義、之後改一個地方就好
- Observable（RxJS）vs Promise：Promise 呼叫當下就送出（eager），Observable 呼叫 `http.get()` 只是準備請求，要 `.subscribe()` 才真的發送（lazy）。不 subscribe，Network tab 完全不會有 request
- standalone 架構下，全 app 共用的服務（如 `provideHttpClient()`、`provideRouter()`）註冊在 `app.config.ts` 的 `providers: []`，取代舊版 `NgModule` 的角色
- json-server 要在專案根目錄（`db.json` 所在位置）執行 `--watch db.json`，在錯的資料夾執行會自動生成一份 typicode 預設範例資料，覆蓋不了你的真實資料但容易搞混
- `<router-outlet />` 是插槽，`app.routes.ts` 是頻道表，網址決定插槽裡渲染哪個元件；元件一旦交給路由管理，就不能再同時寫死掛在別的 template 裡，否則畫面邏輯衝突
- `imports: []` 是元件自己 template 的區域宣告，不是全域註冊——A 元件 import 過某元件，不代表 B 元件也能直接用，每個元件要各自 import 自己模板用到的東西
- `routerLink`（取代 `<a href>`）：點擊換路由不整頁刷新，是 SPA 導覽的標準寫法，要用就要在該元件的 `imports: []` 加 `RouterLink`
- 根路徑導向：`{ path: '', redirectTo: 'menu', pathMatch: 'full' }`，`pathMatch: 'full'` 是必填，避免用「前綴符合」邏輯誤判其他路由
- 路由參數（`:id`）：路徑寫 `orders/:id`，元件裡用 DI 注入內建的 `ActivatedRoute`，`this.route.snapshot.paramMap.get('id')` 讀出網址實際填的值
- Reactive Forms：`FormGroup` 裝多個 `FormControl`，`[formGroup]`（property binding，把整個表單物件綁上 `<form>`）+ `formControlName`（指定 input 對應哪個 control）+ `(ngSubmit)`（event binding，圓括號代表監聽事件，等同 React `onSubmit`）
- `Validators.required` 只標記欄位合法性，不會自動擋送出，要在 submit handler 手動檢查 `this.formGroup.valid`；抓整體用 `.valid`，抓單一欄位用 `.get('field').valid`

---

## 如何接續（給下一次對話的 Claude 使用）

1. 讀這份檔案，確認目前卡在哪個階段／任務
2. 檢查 `src/app/` 實際檔案結構，跟本文件記錄的進度對照，確認學習者是否真的完成了勾選的項目（不要盡信勾選狀態，用 `ls`／`cat` 實際確認檔案內容）
3. 延續 code-mentor 教學方式：Orient → Mental Model → Feynman 解釋 → Check Understanding → Progressive Challenges，不直接把答案/程式碼寫給學習者
4. 教學步調：學習者有 React 跟 vue 經驗，跳過基礎 component 概念重複解釋，聚焦 Angular 特有機制
5. 每完成一個階段，回來更新這份檔案的進度勾選與「已驗證的關鍵觀念」區塊
