(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/domain/equipment/hooks/use-equipment.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEquipment",
    ()=>useEquipment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useEquipment(initialData) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "d4531b967a9cbc001875abc8f086050a2c5753cbf7686ba17a4c7ebd28adc103") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d4531b967a9cbc001875abc8f086050a2c5753cbf7686ba17a4c7ebd28adc103";
    }
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialData.length > 0 ? initialData[0].id : "");
    let t0;
    if ($[1] !== initialData || $[2] !== searchTerm) {
        let t1;
        if ($[4] !== searchTerm) {
            t1 = ({
                "useEquipment[initialData.filter()]": (item)=>item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.model.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase())
            })["useEquipment[initialData.filter()]"];
            $[4] = searchTerm;
            $[5] = t1;
        } else {
            t1 = $[5];
        }
        t0 = initialData.filter(t1);
        $[1] = initialData;
        $[2] = searchTerm;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    const filteredData = t0;
    let t1;
    if ($[6] !== initialData || $[7] !== selectedId) {
        t1 = initialData.find({
            "useEquipment[initialData.find()]": (item_0)=>item_0.id === selectedId
        }["useEquipment[initialData.find()]"]) || initialData[0];
        $[6] = initialData;
        $[7] = selectedId;
        $[8] = t1;
    } else {
        t1 = $[8];
    }
    const selectedItem = t1;
    let t2;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "useEquipment[handleSelect]": (id)=>{
                setSelectedId(id);
            }
        })["useEquipment[handleSelect]"];
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    const handleSelect = t2;
    let t3;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "useEquipment[handleSearch]": (value)=>{
                setSearchTerm(value);
            }
        })["useEquipment[handleSearch]"];
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    const handleSearch = t3;
    let t4;
    if ($[11] !== filteredData || $[12] !== searchTerm || $[13] !== selectedItem) {
        t4 = {
            filteredData,
            selectedItem,
            searchTerm,
            handleSelect,
            handleSearch
        };
        $[11] = filteredData;
        $[12] = searchTerm;
        $[13] = selectedItem;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    return t4;
}
_s(useEquipment, "CYWc+yoQadRw7OVSEEFPCnTTIak=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "4daccef4ecd61a131622beeaae6132835c3b80f61144fc34fb66d382902f773d") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4daccef4ecd61a131622beeaae6132835c3b80f61144fc34fb66d382902f773d";
    }
    let className;
    let props;
    let t1;
    let variant;
    if ($[1] !== t0) {
        ({ className, variant, asChild: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
        $[5] = variant;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
        variant = $[5];
    }
    const asChild = t1 === undefined ? false : t1;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    let t2;
    if ($[6] !== className || $[7] !== variant) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className);
        $[6] = className;
        $[7] = variant;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== Comp || $[10] !== props || $[11] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
            "data-slot": "badge",
            className: t2,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/badge.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[9] = Comp;
        $[10] = props;
        $[11] = t2;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/ui/resizable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResizableHandle",
    ()=>ResizableHandle,
    "ResizablePanel",
    ()=>ResizablePanel,
    "ResizablePanelGroup",
    ()=>ResizablePanelGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVerticalIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function ResizablePanelGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
            "data-slot": "resizable-panel-group",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/resizable.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c = ResizablePanelGroup;
function ResizablePanel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
            "data-slot": "resizable-panel",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/resizable.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = ResizablePanel;
function ResizableHandle(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "47b1bc6504b65f6b4c91a51a6a65f909345afa32349cc7fd1247c08eb27e1ec2";
    }
    let className;
    let props;
    let withHandle;
    if ($[1] !== t0) {
        ({ withHandle, className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = withHandle;
    } else {
        className = $[2];
        props = $[3];
        withHandle = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] !== withHandle) {
        t2 = withHandle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVerticalIcon$3e$__["GripVerticalIcon"], {
                className: "size-2.5"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/ui/resizable.tsx",
                lineNumber: 113,
                columnNumber: 115
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/resizable.tsx",
            lineNumber: 113,
            columnNumber: 24
        }, this);
        $[7] = withHandle;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== props || $[10] !== t1 || $[11] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
            "data-slot": "resizable-handle",
            className: t1,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/resizable.tsx",
            lineNumber: 121,
            columnNumber: 10
        }, this);
        $[9] = props;
        $[10] = t1;
        $[11] = t2;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c2 = ResizableHandle;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ResizablePanelGroup");
__turbopack_context__.k.register(_c1, "ResizablePanel");
__turbopack_context__.k.register(_c2, "ResizableHandle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormGroup",
    ()=>FormGroup,
    "SimpleTable",
    ()=>SimpleTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const FormGroup = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "9762edebc776d265892f69efc9d6f106af00bc984e2db6e896719936985dfe1f") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9762edebc776d265892f69efc9d6f106af00bc984e2db6e896719936985dfe1f";
    }
    const { label, value, type: t1 } = t0;
    const type = t1 === undefined ? "text" : t1;
    let t2;
    if ($[1] !== label) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-semibold text-gray-500",
            children: label
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = label;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== type || $[4] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            value: value,
            type: type,
            readOnly: true,
            className: "h-9 bg-gray-50/50 border-gray-200 focus-visible:ring-0"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = type;
        $[4] = value;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t2 || $[7] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = t2;
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    return t4;
};
_c = FormGroup;
const SimpleTable = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "9762edebc776d265892f69efc9d6f106af00bc984e2db6e896719936985dfe1f") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9762edebc776d265892f69efc9d6f106af00bc984e2db6e896719936985dfe1f";
    }
    const { headers, rows } = t0;
    const getColumnStyle = _temp;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            className: "p-3 w-12 text-center border-r border-gray-200 bg-gray-100/30",
            children: "#"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== headers) {
        let t3;
        if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = (h_0, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-3 border-r border-gray-200 last:border-0", getColumnStyle(h_0)),
                    children: h_0
                }, i, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                    lineNumber: 71,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0));
            $[4] = t3;
        } else {
            t3 = $[4];
        }
        t2 = headers.map(t3);
        $[2] = headers;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[5] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            className: "bg-gray-100/80 text-gray-700 font-bold border-b border-gray-200 sticky top-0 z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                children: [
                    t1,
                    t2
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                lineNumber: 84,
                columnNumber: 111
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = t2;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== headers || $[8] !== rows) {
        let t5;
        if ($[10] !== headers) {
            t5 = (row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    className: "even:bg-gray-50/50 hover:bg-blue-50/40 transition-colors group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "p-2.5 text-center text-gray-400 font-medium border-r border-gray-100 group-hover:bg-blue-50/10",
                            children: idx + 1
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                            lineNumber: 94,
                            columnNumber: 115
                        }, ("TURBOPACK compile-time value", void 0)),
                        row.map((cell, cIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2.5 border-r border-gray-100 last:border-0 truncate", getColumnStyle(headers[cIdx])),
                                title: cell,
                                children: cell
                            }, cIdx, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                                lineNumber: 94,
                                columnNumber: 265
                            }, ("TURBOPACK compile-time value", void 0)))
                    ]
                }, idx, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                    lineNumber: 94,
                    columnNumber: 26
                }, ("TURBOPACK compile-time value", void 0));
            $[10] = headers;
            $[11] = t5;
        } else {
            t5 = $[11];
        }
        t4 = rows.map(t5);
        $[7] = headers;
        $[8] = rows;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[12] !== rows.length) {
        t5 = Array.from({
            length: Math.max(0, 10 - rows.length)
        });
        $[12] = rows.length;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t6;
    if ($[14] !== headers || $[15] !== t5) {
        t6 = t5.map((_, i_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                className: "h-10 even:bg-gray-50/20 border-b border-gray-50 last:border-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                        className: "border-r border-gray-100"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                        lineNumber: 119,
                        columnNumber: 128
                    }, ("TURBOPACK compile-time value", void 0)),
                    headers.map(_temp2)
                ]
            }, `empty-${i_0}`, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                lineNumber: 119,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0)));
        $[14] = headers;
        $[15] = t5;
        $[16] = t6;
    } else {
        t6 = $[16];
    }
    let t7;
    if ($[17] !== t4 || $[18] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            className: "divide-y divide-gray-100",
            children: [
                t4,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 128,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[17] = t4;
        $[18] = t6;
        $[19] = t7;
    } else {
        t7 = $[19];
    }
    let t8;
    if ($[20] !== t3 || $[21] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-sm table-fixed border-collapse",
                children: [
                    t3,
                    t7
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
                lineNumber: 137,
                columnNumber: 117
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
            lineNumber: 137,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[20] = t3;
        $[21] = t7;
        $[22] = t8;
    } else {
        t8 = $[22];
    }
    return t8;
};
_c1 = SimpleTable;
function _temp(header) {
    const h = header.replace(/\s/g, "");
    if (h === "\uC0C1\uD0DC" || h === "\uAD6C\uBD84" || h === "\uC218\uB7C9" || h === "\uAD50\uC815\uC790" || h === "#") {
        return "w-16 text-center";
    }
    if (h === "\uC124\uCE58\uC77C" || h === "\uC77C\uC790" || h === "\uAD50\uCCB4\uC8FC\uAE30" || h === "\uAD50\uC815\uC77C\uC790") {
        return "w-32 text-center";
    }
    if (h === "\uAD00\uB9AC\uBC88\uD638" || h === "\uC81C\uC791\uC0AC" || h === "\uACF5\uAE09\uC5C5\uCCB4") {
        return "w-40 text-center";
    }
    return "text-left";
}
function _temp2(__0, j) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "border-r border-gray-100 last:border-0"
    }, j, false, {
        fileName: "[project]/src/domain/equipment/ui/components/tabs/shared.tsx",
        lineNumber: 160,
        columnNumber: 10
    }, this);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "FormGroup");
__turbopack_context__.k.register(_c1, "SimpleTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BasicInfo",
    ()=>BasicInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
// 기본 플레이스홀더 이미지 (이미지가 없을 경우 대비)
const DEFAULT_PLACEHOLDER_IMAGE = "https://placehold.co/600x400/f3f4f6/94a3b8?text=No+Image";
const BasicInfo = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(45);
    if ($[0] !== "bcb844b9abe312154ae482d9034833262ea32a38dbe28b7e45444064272989f3") {
        for(let $i = 0; $i < 45; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bcb844b9abe312154ae482d9034833262ea32a38dbe28b7e45444064272989f3";
    }
    const { data } = t0;
    const displayImage = data.images && data.images.length > 0 ? data.images[0] : DEFAULT_PLACEHOLDER_IMAGE;
    let t1;
    if ($[1] !== data.category) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC124\uBE44\uD488\uBAA9",
            value: data.category
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 22,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = data.category;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== data.model) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC124\uBE44\uBC88\uD638",
            value: data.model
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = data.model;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t1 || $[6] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t1,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== data.name) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC124\uBE44\uBA85",
            value: data.name
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 47,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[8] = data.name;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== data.facilityName) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC2DC\uC124\uBA85",
            value: data.facilityName
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = data.facilityName;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC6A9\uB3C4",
            value: "Main Power Distribution"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== data.location) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uC124\uCE58\uC704\uCE58",
            value: data.location
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[13] = data.location;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-semibold text-gray-500 uppercase tracking-tight",
            children: "상태"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 78,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    const t9 = data.status === "Active" ? "\uAC00\uB3D9\uC911" : "\uC810\uAC80\uC911";
    let t10;
    if ($[16] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "w-full h-9 rounded-md border border-gray-200 text-sm px-2 bg-gray-50/50 focus:ring-0 focus:border-blue-500 font-medium",
                    disabled: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        children: t9
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
                        lineNumber: 86,
                        columnNumber: 197
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
                    lineNumber: 86,
                    columnNumber: 42
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 86,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[16] = t9;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10 || $[19] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t7,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 94,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[18] = t10;
        $[19] = t7;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "\uB2E4\uC74C\uC810\uAC80\uC77C",
            value: "2024-05-20",
            type: "date"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 103,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-semibold text-gray-500 uppercase tracking-tight",
            children: "비고"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[22] = t13;
    } else {
        t13 = $[22];
    }
    let t14;
    if ($[23] !== data.description) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    className: "w-full rounded-md border border-gray-200 text-sm p-2.5 min-h-[100px] bg-gray-50/50 focus:ring-0 focus:border-blue-500 resize-none text-gray-700",
                    readOnly: true,
                    defaultValue: data.description
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
                    lineNumber: 117,
                    columnNumber: 43
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 117,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[23] = data.description;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    if ($[25] !== t11 || $[26] !== t14 || $[27] !== t3 || $[28] !== t4 || $[29] !== t5) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 grid grid-cols-1 gap-y-4 content-start",
            children: [
                t3,
                t4,
                t5,
                t6,
                t11,
                t12,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[25] = t11;
        $[26] = t14;
        $[27] = t3;
        $[28] = t4;
        $[29] = t5;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    let t16;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-xs font-semibold text-gray-500 uppercase tracking-tight mb-1.5",
            children: "설비사진"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] !== displayImage) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: displayImage,
            alt: "Equipment Main",
            className: "w-full h-full object-cover"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[32] = displayImage;
        $[33] = t17;
    } else {
        t17 = $[33];
    }
    let t18;
    if ($[34] !== data.images) {
        t18 = (!data.images || data.images.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center bg-gray-50/50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] font-bold text-gray-400 uppercase tracking-widest",
                children: "No Image Available"
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
                lineNumber: 152,
                columnNumber: 138
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 152,
            columnNumber: 57
        }, ("TURBOPACK compile-time value", void 0));
        $[34] = data.images;
        $[35] = t18;
    } else {
        t18 = $[35];
    }
    let t19;
    if ($[36] !== t17 || $[37] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "aspect-[4/3] w-full relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-sm transition-all hover:border-blue-300",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 160,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[36] = t17;
        $[37] = t18;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    let t20;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-blue-700 leading-relaxed font-medium",
                children: "※ 설비사진 탭의 첫 번째 등록된 사진이 대표 이미지로 표시됩니다."
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
                lineNumber: 169,
                columnNumber: 88
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[39] = t20;
    } else {
        t20 = $[39];
    }
    let t21;
    if ($[40] !== t19) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-80 flex flex-col shrink-0",
            children: [
                t16,
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[40] = t19;
        $[41] = t21;
    } else {
        t21 = $[41];
    }
    let t22;
    if ($[42] !== t15 || $[43] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-8 h-full",
            children: [
                t15,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx",
            lineNumber: 184,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[42] = t15;
        $[43] = t21;
        $[44] = t22;
    } else {
        t22 = $[44];
    }
    return t22;
};
_c = BasicInfo;
var _c;
__turbopack_context__.k.register(_c, "BasicInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExtendedInfo",
    ()=>ExtendedInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
const ExtendedInfo = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "f5749ca8b7e68b8edd220c1c80752e769c8332d201a8ba927a588b6ef824af6f") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f5749ca8b7e68b8edd220c1c80752e769c8332d201a8ba927a588b6ef824af6f";
    }
    const { data } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Acquisition Method (\uCDE8\uB4DD\uBC29\uBC95)",
            value: "Purchase"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 18,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== data.supplier) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-6",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Source (\uCDE8\uB4DD\uCC98)",
                    value: data.supplier
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 25,
                    columnNumber: 54
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[2] = data.supplier;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== data.acquisitionPrice) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Acquisition Price (\uCDE8\uB4DD\uAC00\uACA9)",
            value: data.acquisitionPrice
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 33,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[4] = data.acquisitionPrice;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-px bg-gray-200 my-2"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== data.manufacturer) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Manufacturer (\uC81C\uC870\uC0AC)",
            value: data.manufacturer
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = data.manufacturer;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Serial No (\uC81C\uC870\uBC88\uD638)",
                    value: "SN-2023-8839"
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 56,
                    columnNumber: 50
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Mfg Date (\uC81C\uC870\uC77C\uC790)",
                    value: "2022-12-10",
                    type: "date"
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 56,
                    columnNumber: 131
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== data.supplier) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Supplier (\uACF5\uAE09\uC0AC)",
                    value: data.supplier
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 63,
                    columnNumber: 50
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Installer (\uC2DC\uACF5\uC0AC)",
                    value: data.supplier
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 63,
                    columnNumber: 125
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = data.supplier;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== data.installDate) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Install Date (\uC124\uCE58/\uAC00\uB3D9\uC77C\uC790)",
                    value: data.installDate,
                    type: "date"
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 71,
                    columnNumber: 50
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
                    label: "Completion Date (\uC900\uACF5\uC77C)",
                    value: data.installDate,
                    type: "date"
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
                    lineNumber: 71,
                    columnNumber: 163
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = data.installDate;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== data.usefulLife) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Useful Life (\uB0B4\uAD6C\uC5F0\uD55C)",
            value: data.usefulLife
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[14] = data.usefulLife;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t2 || $[17] !== t3 || $[18] !== t5 || $[19] !== t7 || $[20] !== t8 || $[21] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-y-4 max-w-3xl",
            children: [
                t2,
                t3,
                t4,
                t5,
                t6,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx",
            lineNumber: 87,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[16] = t2;
        $[17] = t3;
        $[18] = t5;
        $[19] = t7;
        $[20] = t8;
        $[21] = t9;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    return t10;
};
_c = ExtendedInfo;
var _c;
__turbopack_context__.k.register(_c, "ExtendedInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/specs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Specs",
    ()=>Specs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
const Specs = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "b62ec0786799c3d9629f88c64de95df8ae60ad69297adf3487fd9ddb3ae0071d") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b62ec0786799c3d9629f88c64de95df8ae60ad69297adf3487fd9ddb3ae0071d";
    }
    const { data } = t0;
    let t1;
    if ($[1] !== data.specType) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Type / Spec (\uD615\uC2DD/\uC81C\uC6D0)",
            value: data.specType
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 18,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = data.specType;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Operation Method (\uC6B4\uC804\uBC29\uC2DD)",
            value: "Pendant Switch / Remote"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== data.power) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Power / HP (\uB3D9\uB825/\uB9C8\uB825)",
            value: data.power
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 33,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[4] = data.power;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== data.capacity) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Standard / Capacity (\uADDC\uACA9/\uC6A9\uB7C9)",
            value: data.capacity
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = data.capacity;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    let t6;
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Travel / Lift Dist. (\uC8FC\uD589/\uC778\uC591\uAC70\uB9AC)",
            value: "Travel 11.5m / Lift 18m"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Reduction / Torque (\uAC10\uC18D\uBE44/\uD1A0\uD06C)",
            value: "1:30 / 500Nm"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormGroup"], {
            label: "Speed (\uC6B4\uC804/\uD68C\uC804\uC18D\uB3C4)",
            value: "1500 RPM"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[8] = t5;
        $[9] = t6;
        $[10] = t7;
    } else {
        t5 = $[8];
        t6 = $[9];
        t7 = $[10];
    }
    let t8;
    if ($[11] !== t1 || $[12] !== t3 || $[13] !== t4) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-y-4 max-w-3xl",
            children: [
                t1,
                t2,
                t3,
                t4,
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/specs.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[11] = t1;
        $[12] = t3;
        $[13] = t4;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    return t8;
};
_c = Specs;
var _c;
__turbopack_context__.k.register(_c, "Specs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/accessories.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accessories",
    ()=>Accessories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
const Accessories = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "f2cb880de020e72489be4425632a7b0617fb6e66b754553b5a1e093fd7c9d45f") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f2cb880de020e72489be4425632a7b0617fb6e66b754553b5a1e093fd7c9d45f";
    }
    const { data } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "\uC0C1\uD0DC",
            "\uC81C\uC791\uC0AC",
            "\uAD6C\uBD84",
            "\uAD00\uB9AC\uBC88\uD638",
            "\uBA85\uCE6D",
            "\uC124\uCE58\uC77C"
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== data.accessories) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleTable"], {
            headers: t1,
            rows: data.accessories
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/accessories.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[2] = data.accessories;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
};
_c = Accessories;
var _c;
__turbopack_context__.k.register(_c, "Accessories");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/parts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parts",
    ()=>Parts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
const Parts = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "d915a9434593e6bb7257c950e425d106450463c94bc52800f281e63a8a313b9b") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d915a9434593e6bb7257c950e425d106450463c94bc52800f281e63a8a313b9b";
    }
    const { data } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "\uC0C1\uD0DC",
            "\uC790\uC7AC\uADDC\uACA9",
            "\uAD50\uCCB4\uC8FC\uAE30",
            "\uC218\uB7C9",
            "\uBE44\uACE0"
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== data.parts) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleTable"], {
            headers: t1,
            rows: data.parts
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/parts.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[2] = data.parts;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
};
_c = Parts;
var _c;
__turbopack_context__.k.register(_c, "Parts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/ui/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCaption",
    ()=>TableCaption,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Table(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "table-container",
            className: "relative w-full overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                "data-slot": "table",
                className: t1,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/shared/components/ui/table.tsx",
                lineNumber: 38,
                columnNumber: 87
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c = Table;
function TableHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr]:border-b", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            "data-slot": "table-header",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c1 = TableHeader;
function TableBody(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            "data-slot": "table-body",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c2 = TableBody;
function TableFooter(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
            "data-slot": "table-footer",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 161,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c3 = TableFooter;
function TableRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            "data-slot": "table-row",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 202,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c4 = TableRow;
function TableHead(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            "data-slot": "table-head",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 243,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c5 = TableHead;
function TableCell(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            "data-slot": "table-cell",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 284,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c6 = TableCell;
function TableCaption(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6fdbdb0e594ad4a5b0380adc91ab741594af924045c7c60ddb8fb24a42287db1";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground mt-4 text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
            "data-slot": "table-caption",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/shared/components/ui/table.tsx",
            lineNumber: 325,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c7 = TableCaption;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "TableHeader");
__turbopack_context__.k.register(_c2, "TableBody");
__turbopack_context__.k.register(_c3, "TableFooter");
__turbopack_context__.k.register(_c4, "TableRow");
__turbopack_context__.k.register(_c5, "TableHead");
__turbopack_context__.k.register(_c6, "TableCell");
__turbopack_context__.k.register(_c7, "TableCaption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/history.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "History",
    ()=>History
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function History(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "b68e1afe47d083099a40c44484bd8daa698c35c0bd48fc880d2906c43900b424") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b68e1afe47d083099a40c44484bd8daa698c35c0bd48fc880d2906c43900b424";
    }
    const { data } = t0;
    let t1;
    if ($[1] !== data.history?.maintenance) {
        t1 = data.history?.maintenance || [];
        $[1] = data.history?.maintenance;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const maintenanceData = t1;
    let t2;
    if ($[3] !== data.history?.materials) {
        t2 = data.history?.materials || [];
        $[3] = data.history?.materials;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const materialsData = t2;
    const renderTableRows = _HistoryRenderTableRows;
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center mb-1.5 shrink-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[13px] font-bold text-slate-700 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-1.5 h-3.5 bg-blue-600 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 48,
                        columnNumber: 138
                    }, this),
                    "수리 및 정비 이력"
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                lineNumber: 48,
                columnNumber: 61
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
            className: "bg-slate-50 z-10 shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                className: "hover:bg-transparent border-none h-9",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[110px] font-bold border-r border-slate-200 text-center text-[11px]",
                        children: "일자"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 55,
                        columnNumber: 121
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[80px] font-bold border-r border-slate-200 text-center text-[11px]",
                        children: "구분"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 55,
                        columnNumber: 228
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "font-bold border-r border-slate-200 text-[11px]",
                        children: "내용"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 55,
                        columnNumber: 334
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[100px] font-bold border-r border-slate-200 text-right text-[11px]",
                        children: "비용"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 55,
                        columnNumber: 419
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[80px] font-bold text-center text-[11px]",
                        children: "상태"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 55,
                        columnNumber: 525
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                lineNumber: 55,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== maintenanceData) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col min-h-0",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        className: "border-collapse",
                        children: [
                            t4,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: renderTableRows(maintenanceData, 5, "maintenance")
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                                lineNumber: 62,
                                columnNumber: 179
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 62,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                    lineNumber: 62,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[7] = maintenanceData;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center mb-1.5 shrink-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[13px] font-bold text-slate-700 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-1.5 h-3.5 bg-amber-500 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 70,
                        columnNumber: 138
                    }, this),
                    "자재 및 부품 이력"
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                lineNumber: 70,
                columnNumber: 61
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
            className: "bg-slate-50 z-10 shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                className: "hover:bg-transparent border-none h-9",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[90px] font-bold border-r border-slate-200 text-center text-[11px]",
                        children: "구분"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 77,
                        columnNumber: 121
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[130px] font-bold border-r border-slate-200 text-center text-[11px]",
                        children: "구매처"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 77,
                        columnNumber: 227
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "font-bold border-r border-slate-200 text-[11px]",
                        children: "품명/규격"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 77,
                        columnNumber: 335
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[80px] font-bold border-r border-slate-200 text-right text-[11px]",
                        children: "수량"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 77,
                        columnNumber: 423
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                        className: "w-[100px] font-bold text-right text-[11px]",
                        children: "금액"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 77,
                        columnNumber: 528
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                lineNumber: 77,
                columnNumber: 62
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== materialsData) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col min-h-0",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        className: "border-collapse",
                        children: [
                            t7,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: renderTableRows(materialsData, 5, "materials")
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                                lineNumber: 84,
                                columnNumber: 179
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                        lineNumber: 84,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                    lineNumber: 84,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[11] = materialsData;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== t5 || $[14] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 h-full min-h-0 overflow-hidden",
            children: [
                t5,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[13] = t5;
        $[14] = t8;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    return t9;
}
_c = History;
function _HistoryRenderTableRows(currentData, colCount, type) {
    const rows = [];
    const dataToShow = currentData.slice(0, 4);
    dataToShow.forEach({
        "History[renderTableRows > dataToShow.forEach()]": (item, index)=>{
            if (type === "maintenance") {
                rows.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                    className: "h-9 border-slate-50 hover:bg-slate-50/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-[12px] border-r border-slate-100 text-center",
                            children: item[1]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 107,
                            columnNumber: 104
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "border-r border-slate-100 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-1.5 py-0.5 rounded text-[10px] font-bold", item[0] === "\uC218\uB9AC" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"),
                                children: item[0]
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                                lineNumber: 107,
                                columnNumber: 259
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 107,
                            columnNumber: 198
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-[12px] text-slate-500 border-r border-slate-100 truncate max-w-[200px]",
                            children: item[2]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 107,
                            columnNumber: 439
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-right font-mono text-[12px] border-r border-slate-100",
                            children: item[5]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 107,
                            columnNumber: 559
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-center font-bold text-[11px] text-emerald-600",
                            children: item[6]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 107,
                            columnNumber: 662
                        }, this)
                    ]
                }, `data-${index}`, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                    lineNumber: 107,
                    columnNumber: 19
                }, this));
            } else {
                rows.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                    className: "h-9 border-slate-50 hover:bg-slate-50/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-[12px] border-r border-slate-100 text-center",
                            children: item[0]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 109,
                            columnNumber: 104
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-[12px] border-r border-slate-100 text-center truncate max-w-[120px]",
                            children: item[1]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 109,
                            columnNumber: 198
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-[12px] font-semibold text-slate-700 border-r border-slate-100 truncate max-w-[200px]",
                            children: item[2]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 109,
                            columnNumber: 315
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-right font-mono text-[12px] border-r border-slate-100",
                            children: item[3]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 109,
                            columnNumber: 449
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                            className: "text-right font-mono text-[12px]",
                            children: item[5]
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 109,
                            columnNumber: 552
                        }, this)
                    ]
                }, `data-${index}`, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                    lineNumber: 109,
                    columnNumber: 19
                }, this));
            }
        }
    }["History[renderTableRows > dataToShow.forEach()]"]);
    if (rows.length < 5) {
        rows.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
            className: "bg-slate-50/30 hover:bg-blue-50/50 cursor-pointer group h-9 border-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                colSpan: colCount,
                className: "text-center text-slate-400 text-xs italic",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 group-hover:text-blue-600 transition-colors font-semibold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                            lineNumber: 114,
                            columnNumber: 326
                        }, this),
                        "새로운 ",
                        type === "maintenance" ? "\uC218\uB9AC" : "\uC790\uC7AC",
                        " 이력 추가"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                    lineNumber: 114,
                    columnNumber: 212
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
                lineNumber: 114,
                columnNumber: 128
            }, this)
        }, "add-row", false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 114,
            columnNumber: 15
        }, this));
    }
    while(rows.length < 5){
        rows.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
            className: "h-9 border-slate-50",
            children: Array.from({
                length: colCount
            }).map(_HistoryRenderTableRowsAnonymous)
        }, `empty-${rows.length}`, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
            lineNumber: 117,
            columnNumber: 15
        }, this));
    }
    return rows;
}
function _HistoryRenderTableRowsAnonymous(_, j) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
        className: "border-r border-slate-100 last:border-r-0"
    }, j, false, {
        fileName: "[project]/src/domain/equipment/ui/components/tabs/history.tsx",
        lineNumber: 124,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "History");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/inspection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Inspection",
    ()=>Inspection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/shared.tsx [app-client] (ecmascript)");
;
;
;
const Inspection = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "1e55e12fb2efb53370b7ab30296610d869a514289383c80081812bb127d08a93") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1e55e12fb2efb53370b7ab30296610d869a514289383c80081812bb127d08a93";
    }
    const { data } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "\uAD6C\uBD84",
            "\uC77C\uC790",
            "\uAD50\uC815\uC790",
            "\uBCF4\uC815\uC804\uAC12",
            "\uAE30\uC900\uAC12",
            "\uD3B8\uCC28",
            "\uBCF4\uC815\uD6C4\uAC12"
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== data.inspections) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimpleTable"], {
            headers: t1,
            rows: data.inspections
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/inspection.tsx",
            lineNumber: 25,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[2] = data.inspections;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
};
_c = Inspection;
var _c;
__turbopack_context__.k.register(_c, "Inspection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/components/tabs/photos.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Photos",
    ()=>Photos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
"use client";
;
;
;
function Photos(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "b61312088710bc5c566725ccc590a8bf48efeed853507eb7a646790aa42fbc01") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b61312088710bc5c566725ccc590a8bf48efeed853507eb7a646790aa42fbc01";
    }
    const { data } = t0;
    let t1;
    if ($[1] !== data.images) {
        t1 = data.images || [];
        $[1] = data.images;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const images = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[13px] font-bold text-slate-700 flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1.5 h-3.5 bg-indigo-500 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                    lineNumber: 34,
                    columnNumber: 87
                }, this),
                "설비 사진 관리"
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== images.length) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-4 shrink-0",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] text-slate-400 font-medium",
                    children: [
                        images.length,
                        " / ",
                        6,
                        " 장 등록됨"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                    lineNumber: 41,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[4] = images.length;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== images) {
        t4 = images.map(_PhotosImagesMap);
        $[6] = images;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== images.length) {
        t5 = images.length < 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform border border-slate-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-4 w-4 text-slate-400 group-hover:text-indigo-600"
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                                lineNumber: 57,
                                columnNumber: 411
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                            lineNumber: 57,
                            columnNumber: 291
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-bold text-slate-400 group-hover:text-indigo-600",
                            children: "사진 업로드"
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                            lineNumber: 57,
                            columnNumber: 488
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                    lineNumber: 57,
                    columnNumber: 68
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-1 opacity-0 pointer-events-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px]",
                            children: "Placeholder"
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                            lineNumber: 57,
                            columnNumber: 642
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px]",
                            children: "Date"
                        }, void 0, false, {
                            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                            lineNumber: 57,
                            columnNumber: 684
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                    lineNumber: 57,
                    columnNumber: 590
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
            lineNumber: 57,
            columnNumber: 31
        }, this);
        $[8] = images.length;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t4 || $[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-5 pb-4",
                children: [
                    t4,
                    t5
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                lineNumber: 65,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[10] = t4;
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] !== t3 || $[14] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full w-full min-h-0 overflow-hidden",
            children: [
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[13] = t3;
        $[14] = t6;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    return t7;
}
_c = Photos;
function _PhotosImagesMap(url, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-video group overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: url,
                        alt: `설비 사진 ${index + 1}`,
                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                        lineNumber: 84,
                        columnNumber: 178
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1.5 bg-white/20 backdrop-blur-md rounded-md hover:bg-white/40 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                    className: "h-4 w-4 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                                    lineNumber: 84,
                                    columnNumber: 561
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                                lineNumber: 84,
                                columnNumber: 459
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-1.5 bg-red-500/80 backdrop-blur-md rounded-md hover:bg-red-600 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                                    lineNumber: 84,
                                    columnNumber: 714
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                                lineNumber: 84,
                                columnNumber: 611
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                        lineNumber: 84,
                        columnNumber: 317
                    }, this),
                    index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-2 left-2 px-2 py-0.5 bg-indigo-600/90 backdrop-blur-sm rounded text-[10px] text-white font-bold z-10",
                        children: "기본"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                        lineNumber: 84,
                        columnNumber: 781
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                lineNumber: 84,
                columnNumber: 59
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] font-bold text-slate-700 truncate",
                        children: index === 0 ? "\uBA54\uC778 \uC124\uBE44 \uC804\uBA74 \uC0AC\uC9C4" : `설비 상세 사진 ${index + 1}`
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                        lineNumber: 84,
                        columnNumber: 952
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-slate-400 font-medium",
                        children: "2026-01-21 등록"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                        lineNumber: 84,
                        columnNumber: 1112
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
                lineNumber: 84,
                columnNumber: 930
            }, this)
        ]
    }, index, true, {
        fileName: "[project]/src/domain/equipment/ui/components/tabs/photos.tsx",
        lineNumber: 84,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "Photos");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/ui/main-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainView",
    ()=>MainView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ui/resizable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$basic$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/basic-info.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$extended$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/extended-info.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$specs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/specs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$accessories$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/accessories.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$parts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/parts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/history.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$inspection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/inspection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$photos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/components/tabs/photos.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const TABS = [
    {
        id: "basic",
        label: "기본정보"
    },
    {
        id: "extended",
        label: "확장정보"
    },
    {
        id: "specs",
        label: "사양정보"
    },
    {
        id: "accessories",
        label: "부속장치"
    },
    {
        id: "parts",
        label: "주요부품"
    },
    {
        id: "history",
        label: "이력관리"
    },
    {
        id: "inspection",
        label: "시험검사"
    },
    {
        id: "photos",
        label: "설비사진"
    }
];
function MainView(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(95);
    if ($[0] !== "cabade4ef384bb4c928f25a733c99b0920da8919180d8defa3f291e1ce84b592") {
        for(let $i = 0; $i < 95; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cabade4ef384bb4c928f25a733c99b0920da8919180d8defa3f291e1ce84b592";
    }
    const { data, selectedItem, onSelect, searchTerm, onSearchChange } = t0;
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("basic");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-lg font-bold text-slate-800 tracking-tight flex items-center pt-3",
            children: "설비관리(Equipment Management)"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-slate-500 hover:bg-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 77,
                columnNumber: 102
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-slate-500 hover:bg-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 84,
                columnNumber: 102
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-red-500 hover:bg-red-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 91,
                columnNumber: 97
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 text-slate-500 hover:bg-slate-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 98,
                columnNumber: 102
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "h-12 bg-white px-6 flex items-stretch justify-between shrink-0 z-30",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center pt-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-sm",
                        children: [
                            t2,
                            t3,
                            t4,
                            t5,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-7 w-7 p-0 text-slate-500 hover:bg-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                    lineNumber: 105,
                                    columnNumber: 351
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                lineNumber: 105,
                                columnNumber: 259
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                        lineNumber: 105,
                        columnNumber: 142
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                    lineNumber: 105,
                    columnNumber: 102
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[7] = t7;
    } else {
        t7 = $[7];
    }
    let t8;
    if ($[8] !== onSearchChange) {
        t8 = ({
            "MainView[<Input>.onChange]": (e)=>onSearchChange(e.target.value)
        })["MainView[<Input>.onChange]"];
        $[8] = onSearchChange;
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] !== searchTerm || $[11] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 border-b border-slate-50 shrink-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    t7,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "\uC124\uBE44 \uAC80\uC0C9...",
                        value: searchTerm,
                        onChange: t8,
                        className: "pl-9 bg-slate-50/50 border-slate-200 rounded-xl shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                        lineNumber: 129,
                        columnNumber: 95
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 129,
                columnNumber: 65
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        $[10] = searchTerm;
        $[11] = t8;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== data || $[14] !== onSelect || $[15] !== selectedItem.id) {
        let t11;
        if ($[17] !== onSelect || $[18] !== selectedItem.id) {
            t11 = ({
                "MainView[data.map()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "MainView[data.map() > <button>.onClick]": ()=>onSelect(item.id)
                        }["MainView[data.map() > <button>.onClick]"],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all border outline-none", selectedItem.id === item.id ? "bg-white border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.12)] ring-1 ring-blue-500" : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full items-center justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold text-[14px] truncate", selectedItem.id === item.id ? "text-blue-700" : "text-slate-800"),
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                        lineNumber: 143,
                                        columnNumber: 429
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-5 px-2 text-[10px] font-bold rounded-full", item.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"),
                                        children: item.status === "Active" ? "\uAC00\uB3D9\uC911" : "\uC810\uAC80\uC911"
                                    }, void 0, false, {
                                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                        lineNumber: 143,
                                        columnNumber: 568
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                lineNumber: 143,
                                columnNumber: 366
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between w-full text-[11px] text-slate-400 font-semibold uppercase",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.model
                                    }, void 0, false, {
                                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                        lineNumber: 143,
                                        columnNumber: 933
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.location
                                    }, void 0, false, {
                                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                        lineNumber: 143,
                                        columnNumber: 958
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                                lineNumber: 143,
                                columnNumber: 837
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                        lineNumber: 141,
                        columnNumber: 41
                    }, this)
            })["MainView[data.map()]"];
            $[17] = onSelect;
            $[18] = selectedItem.id;
            $[19] = t11;
        } else {
            t11 = $[19];
        }
        t10 = data.map(t11);
        $[13] = data;
        $[14] = onSelect;
        $[15] = selectedItem.id;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[20] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-y-auto p-3 space-y-2",
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    let t12;
    if ($[22] !== t11 || $[23] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanel"], {
            defaultSize: 20,
            minSize: 15,
            maxSize: 25,
            className: "min-w-[300px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full p-4 pr-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
                    children: [
                        t9,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                    lineNumber: 169,
                    columnNumber: 129
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 169,
                columnNumber: 96
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t9;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizableHandle"], {
            className: "w-0 bg-transparent"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== selectedItem.name) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-slate-900 tracking-tight mb-3",
            children: selectedItem.name
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[26] = selectedItem.name;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] !== selectedItem.model) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono leading-none",
            children: selectedItem.model
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 193,
            columnNumber: 11
        }, this);
        $[28] = selectedItem.model;
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-300",
            children: "|"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[30] = t16;
    } else {
        t16 = $[30];
    }
    let t17;
    if ($[31] !== selectedItem.location) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: selectedItem.location
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 208,
            columnNumber: 11
        }, this);
        $[31] = selectedItem.location;
        $[32] = t17;
    } else {
        t17 = $[32];
    }
    let t18;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-300",
            children: "|"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[33] = t18;
    } else {
        t18 = $[33];
    }
    let t19;
    if ($[34] !== selectedItem.status) {
        t19 = selectedItem.status === "Active" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-500"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 223,
            columnNumber: 46
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
            className: "h-4 w-4 text-amber-500"
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 223,
            columnNumber: 102
        }, this);
        $[34] = selectedItem.status;
        $[35] = t19;
    } else {
        t19 = $[35];
    }
    const t20 = selectedItem.status === "Active" ? "text-emerald-700" : "text-amber-700";
    const t21 = selectedItem.status === "Active" ? "\uC815\uC0C1 \uAC00\uB3D9 \uC911" : "\uC720\uC9C0\uBCF4\uC218 \uD544\uC694";
    let t22;
    if ($[36] !== t20 || $[37] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t20,
            children: t21
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[36] = t20;
        $[37] = t21;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== t19 || $[40] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex items-center gap-1.5",
            children: [
                t19,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 242,
            columnNumber: 11
        }, this);
        $[39] = t19;
        $[40] = t22;
        $[41] = t23;
    } else {
        t23 = $[41];
    }
    let t24;
    if ($[42] !== t15 || $[43] !== t17 || $[44] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 text-[13px] text-slate-500 font-bold",
            children: [
                t15,
                t16,
                t17,
                t18,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 251,
            columnNumber: 11
        }, this);
        $[42] = t15;
        $[43] = t17;
        $[44] = t23;
        $[45] = t24;
    } else {
        t24 = $[45];
    }
    let t25;
    if ($[46] !== t14 || $[47] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-4 shrink-0",
            children: [
                t14,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 261,
            columnNumber: 11
        }, this);
        $[46] = t14;
        $[47] = t24;
        $[48] = t25;
    } else {
        t25 = $[48];
    }
    let t26;
    if ($[49] !== activeTab) {
        t26 = TABS.map({
            "MainView[TABS.map()]": (tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "MainView[TABS.map() > <button>.onClick]": ()=>setActiveTab(tab.id)
                    }["MainView[TABS.map() > <button>.onClick]"],
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-5 pb-[21px] text-[13px] font-bold border-b-2 whitespace-nowrap transition-all tracking-tight leading-none outline-none shadow-none", activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"),
                    children: tab.label
                }, tab.id, false, {
                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                    lineNumber: 271,
                    columnNumber: 38
                }, this)
        }["MainView[TABS.map()]"]);
        $[49] = activeTab;
        $[50] = t26;
    } else {
        t26 = $[50];
    }
    let t27;
    if ($[51] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-end h-14 border-b border-slate-100 px-8 shrink-0 bg-slate-50/30",
            children: t26
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[51] = t26;
        $[52] = t27;
    } else {
        t27 = $[52];
    }
    let t28;
    if ($[53] !== activeTab || $[54] !== selectedItem) {
        t28 = activeTab === "basic" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$basic$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasicInfo"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 290,
            columnNumber: 36
        }, this);
        $[53] = activeTab;
        $[54] = selectedItem;
        $[55] = t28;
    } else {
        t28 = $[55];
    }
    let t29;
    if ($[56] !== activeTab || $[57] !== selectedItem) {
        t29 = activeTab === "extended" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$extended$2d$info$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtendedInfo"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 299,
            columnNumber: 39
        }, this);
        $[56] = activeTab;
        $[57] = selectedItem;
        $[58] = t29;
    } else {
        t29 = $[58];
    }
    let t30;
    if ($[59] !== activeTab || $[60] !== selectedItem) {
        t30 = activeTab === "specs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$specs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Specs"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 308,
            columnNumber: 36
        }, this);
        $[59] = activeTab;
        $[60] = selectedItem;
        $[61] = t30;
    } else {
        t30 = $[61];
    }
    let t31;
    if ($[62] !== activeTab || $[63] !== selectedItem) {
        t31 = activeTab === "accessories" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$accessories$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accessories"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 317,
            columnNumber: 42
        }, this);
        $[62] = activeTab;
        $[63] = selectedItem;
        $[64] = t31;
    } else {
        t31 = $[64];
    }
    let t32;
    if ($[65] !== activeTab || $[66] !== selectedItem) {
        t32 = activeTab === "parts" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$parts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parts"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 326,
            columnNumber: 36
        }, this);
        $[65] = activeTab;
        $[66] = selectedItem;
        $[67] = t32;
    } else {
        t32 = $[67];
    }
    let t33;
    if ($[68] !== activeTab || $[69] !== selectedItem) {
        t33 = activeTab === "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["History"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 335,
            columnNumber: 38
        }, this);
        $[68] = activeTab;
        $[69] = selectedItem;
        $[70] = t33;
    } else {
        t33 = $[70];
    }
    let t34;
    if ($[71] !== activeTab || $[72] !== selectedItem) {
        t34 = activeTab === "inspection" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$inspection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Inspection"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 344,
            columnNumber: 41
        }, this);
        $[71] = activeTab;
        $[72] = selectedItem;
        $[73] = t34;
    } else {
        t34 = $[73];
    }
    let t35;
    if ($[74] !== activeTab || $[75] !== selectedItem) {
        t35 = activeTab === "photos" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$components$2f$tabs$2f$photos$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Photos"], {
            data: selectedItem
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 353,
            columnNumber: 37
        }, this);
        $[74] = activeTab;
        $[75] = selectedItem;
        $[76] = t35;
    } else {
        t35 = $[76];
    }
    let t36;
    if ($[77] !== t28 || $[78] !== t29 || $[79] !== t30 || $[80] !== t31 || $[81] !== t32 || $[82] !== t33 || $[83] !== t34 || $[84] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-hidden p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-[1200px] mx-auto h-full flex flex-col",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-in fade-in duration-300 h-full",
                    children: [
                        t28,
                        t29,
                        t30,
                        t31,
                        t32,
                        t33,
                        t34,
                        t35
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                    lineNumber: 362,
                    columnNumber: 123
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 362,
                columnNumber: 55
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 362,
            columnNumber: 11
        }, this);
        $[77] = t28;
        $[78] = t29;
        $[79] = t30;
        $[80] = t31;
        $[81] = t32;
        $[82] = t33;
        $[83] = t34;
        $[84] = t35;
        $[85] = t36;
    } else {
        t36 = $[85];
    }
    let t37;
    if ($[86] !== t27 || $[87] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
            children: [
                t27,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        $[86] = t27;
        $[87] = t36;
        $[88] = t37;
    } else {
        t37 = $[88];
    }
    let t38;
    if ($[89] !== t25 || $[90] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanel"], {
            defaultSize: 80,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-full overflow-y-auto p-4 pl-2 gap-4",
                children: [
                    t25,
                    t37
                ]
            }, void 0, true, {
                fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                lineNumber: 386,
                columnNumber: 44
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 386,
            columnNumber: 11
        }, this);
        $[89] = t25;
        $[90] = t37;
        $[91] = t38;
    } else {
        t38 = $[91];
    }
    let t39;
    if ($[92] !== t12 || $[93] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full w-full bg-white overflow-hidden",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-hidden bg-slate-50/50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResizablePanelGroup"], {
                        direction: "horizontal",
                        className: "h-full items-stretch gap-0",
                        children: [
                            t12,
                            t13,
                            t38
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                        lineNumber: 395,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
                    lineNumber: 395,
                    columnNumber: 85
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/domain/equipment/ui/main-view.tsx",
            lineNumber: 395,
            columnNumber: 11
        }, this);
        $[92] = t12;
        $[93] = t38;
        $[94] = t39;
    } else {
        t39 = $[94];
    }
    return t39;
}
_s(MainView, "QPwSnQpdSOvQ99zmGo2B+fHuDcI=");
_c = MainView;
var _c;
__turbopack_context__.k.register(_c, "MainView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/data/equipment-mock.ts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EQUIPMENT_DATA",
    ()=>EQUIPMENT_DATA
]);
const EQUIPMENT_DATA = [
    {
        id: "HV-4",
        name: "22.9KV PF&PT PANEL",
        facilityName: "시설팀",
        status: "Active",
        location: "전기실",
        category: "ALTS반",
        model: "HV-4",
        manufacturer: "현대일렉트릭",
        installDate: "2023-01-15",
        description: "A구역 메인 전력 분배 패널입니다.",
        images: [
            "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
        ],
        accessories: [
            [
                "가동중",
                "LS일렉트릭",
                "차단기",
                "CB-001",
                "메인 진공차단기",
                "2023-01-15"
            ],
            [
                "가동중",
                "삼성",
                "컨트롤러",
                "CTL-102",
                "디지털 집중표시계",
                "2023-01-15"
            ]
        ],
        parts: [
            [
                "양호",
                "PF 200A",
                "3년",
                "3",
                "메인 퓨즈"
            ],
            [
                "양호",
                "PT 절연유",
                "2년",
                "1",
                "교체 완료"
            ]
        ],
        history: {
            maintenance: [
                [
                    "수리",
                    "2023-11-10",
                    "부품 교체",
                    "김철수",
                    "자체",
                    "50,000",
                    "완료"
                ],
                [
                    "점검",
                    "2023-05-20",
                    "정기 점검",
                    "이영희",
                    "외부",
                    "200,000",
                    "정상"
                ]
            ],
            materials: [
                [
                    "구매",
                    "툴데포",
                    "PF 200A",
                    "3",
                    "15,000",
                    "45,000"
                ]
            ]
        },
        inspections: [
            [
                "정기",
                "2023-12-01",
                "박검사",
                "22.9kV",
                "22.9kV ±5%",
                "0.0",
                "22.9kV"
            ]
        ],
        acquisitionPrice: "45,000,000",
        supplier: "현대중공업",
        usefulLife: "15년",
        specType: "전동식 현수형",
        power: "3Φ x 380V x 60Hz",
        capacity: "3 TON"
    },
    {
        id: "M-1-1",
        name: "송풍기 (Main Blower)",
        facilityName: "운영팀",
        status: "Maintenance",
        location: "지하 1층 기계실",
        category: "송풍기",
        model: "CF-5000",
        manufacturer: "LG전자",
        installDate: "2021-06-20",
        description: "로비 공조용 메인 송풍기입니다.",
        images: [],
        accessories: [
            [
                "정지",
                "현대모터",
                "모터",
                "MOT-500",
                "15HP 구동 모터",
                "2021-06-20"
            ]
        ],
        parts: [
            [
                "교체필요",
                "V-Belt A-45",
                "6개월",
                "4",
                "슬립 발생"
            ],
            [
                "양호",
                "그리스",
                "3개월",
                "1",
                "주입 완료"
            ]
        ],
        history: {
            maintenance: [
                [
                    "긴급",
                    "2024-01-05",
                    "벨트 파손",
                    "박대리",
                    "자체",
                    "10,000",
                    "조치중"
                ]
            ],
            materials: [
                [
                    "구매",
                    "상사",
                    "V-Belt",
                    "4",
                    "5,000",
                    "20,000"
                ]
            ]
        },
        inspections: [
            [
                "수시",
                "2024-01-02",
                "최공무",
                "1500rpm",
                "1500rpm",
                "-20",
                "1480rpm"
            ]
        ],
        acquisitionPrice: "12,000,000",
        supplier: "LG HVAC",
        usefulLife: "10년",
        specType: "터보팬",
        power: "380V / 15HP",
        capacity: "5000 CMM"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/domain/equipment/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EquipmentManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$hooks$2f$use$2d$equipment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/hooks/use-equipment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$main$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/ui/main-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$data$2f$equipment$2d$mock$2e$ts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/equipment/data/equipment-mock.ts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function EquipmentManagement() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "f21d058b7928116f4cc01a73b1f783e078883b834a7f60d0f6e098995575a3e6") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f21d058b7928116f4cc01a73b1f783e078883b834a7f60d0f6e098995575a3e6";
    }
    const { filteredData, selectedItem, searchTerm, handleSelect, handleSearch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$hooks$2f$use$2d$equipment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEquipment"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$data$2f$equipment$2d$mock$2e$ts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EQUIPMENT_DATA"]);
    let t0;
    if ($[1] !== filteredData || $[2] !== handleSearch || $[3] !== handleSelect || $[4] !== searchTerm || $[5] !== selectedItem) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$ui$2f$main$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MainView"], {
            data: filteredData,
            selectedItem: selectedItem,
            searchTerm: searchTerm,
            onSelect: handleSelect,
            onSearchChange: handleSearch
        }, void 0, false, {
            fileName: "[project]/src/domain/equipment/index.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[1] = filteredData;
        $[2] = handleSearch;
        $[3] = handleSelect;
        $[4] = searchTerm;
        $[5] = selectedItem;
        $[6] = t0;
    } else {
        t0 = $[6];
    }
    return t0;
}
_s(EquipmentManagement, "ZJKF9lLYPUixj+Z1Ij0XCkQOCXA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$equipment$2f$hooks$2f$use$2d$equipment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEquipment"]
    ];
});
_c = EquipmentManagement;
var _c;
__turbopack_context__.k.register(_c, "EquipmentManagement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_de31281a._.js.map