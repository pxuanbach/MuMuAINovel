const zh = {
  foreshadows: {
    // Status labels
    statusPending: '待埋入',
    statusPlanted: '已埋入',
    statusResolved: '已回收',
    statusPartiallyResolved: '部分回收',
    statusAbandoned: '已废弃',

    // Category labels
    categoryIdentity: '身世',
    categoryMystery: '悬念',
    categoryItem: '物品',
    categoryRelationship: '关系',
    categoryEvent: '事件',
    categoryAbility: '能力',
    categoryProphecy: '预言',

    // Table column titles
    colStatus: '状态',
    colTitle: '标题',
    longTermShort: '长线',
    category: '分类',
    colPlantChapter: '埋入章节',
    planResolve: '计划回收',
    colImportance: '重要性',
    colSource: '来源',
    colActions: '操作',

    // Source values
    sourceAnalysis: '分析',
    sourceManual: '手动',

    // Units
    chapterNumber: '第{{num}}章',

    // Urgency badges
    overdueChapter: '已超期{{count}}章',
    remainingChapter: '还剩{{count}}章',

    // Tooltips / confirmations
    viewDetails: '查看详情',
    edit: '编辑',
    markPlant: '标记埋入',
    markResolve: '标记回收',
    abandon: '废弃',
    delete: '删除',
    confirmAbandon: '确定要废弃这个伏笔吗？',
    confirmDelete: '确定要删除这个伏笔吗？',

    // Stats
    statTotal: '总计',
    statLongTerm: '长线伏笔',
    statOverdue: '超期未回收',

    // Alerts
    overdueAlertMessage: '有 {{count}} 个伏笔已超期未回收',
    overdueAlertDesc: '请尽快在后续章节中回收这些伏笔，或调整计划回收章节',
    autoSyncNotice: '伏笔数据会在章节分析完成后自动同步，无需手动操作',

    // Toolbar
    filterStatus: '状态筛选',
    filterCategory: '分类筛选',
    filterSource: '来源筛选',
    refreshList: '刷新列表',
    manualSync: '手动同步分析伏笔',
    more: '更多',
    addForeshadow: '添加伏笔',
    emptyText: '暂无伏笔，点击右上角添加',
    totalItems: '共 {{total}} 条',

    // Action feedback
    createSuccess: '伏笔创建成功',
    updateSuccess: '伏笔更新成功',
    deleteSuccess: '伏笔删除成功',
    plantSuccess: '伏笔已标记为埋入',
    resolveSuccess: '伏笔已标记为回收',
    abandonSuccess: '伏笔已标记为废弃',
    syncComplete: '同步完成: 新增{{synced}}个伏笔, 跳过{{skipped}}个',

    // Edit / create modal
    editForeshadow: '编辑伏笔',
    fieldTitle: '伏笔标题',
    titleRequired: '请输入标题',
    titlePlaceholder: '简洁描述伏笔内容',
    selectCategory: '选择分类',
    fieldContent: '伏笔内容',
    contentRequired: '请输入内容',
    contentPlaceholder: '详细描述伏笔的内容和意图',
    planPlant: '计划埋入',
    chapterNumberPlaceholder: '章节号',
    relatedCharacters: '关联角色',
    selectRelatedCharacters: '选择关联角色',
    importanceRange: '重要性 (0-1)',
    strengthRange: '强度 (1-10)',
    subtletyRange: '隐藏度 (1-10)',
    longTermForeshadow: '长线伏笔',
    yes: '是',
    no: '否',
    hintText: '暗示文本',
    hintTextPlaceholder: '埋伏笔时使用的暗示性描写',
    notes: '备注',
    notesPlaceholder: '创作备注（仅作者可见）',
    aiAssistSettings: 'AI辅助设置',
    autoRemind: '自动提醒',
    on: '开',
    off: '关',
    includeInContext: '包含在生成上下文',
    remindBefore: '提前几章提醒',

    // Detail modal
    detailTitle: '伏笔详情',
    close: '关闭',
    contentLabel: '伏笔内容：',
    hintTextLabel: '暗示文本：',
    resolutionTextLabel: '揭示文本：',
    plantChapterLabel: '埋入章节：',
    planResolveLabel: '计划回收：',
    actualResolveLabel: '实际回收：',
    importanceLabel: '重要性：',
    strengthLabel: '强度：',
    subtletyLabel: '隐藏度：',
    relatedCharactersLabel: '关联角色：',
    notesLabel: '备注：',
    sourceLabel: '来源：',
    notSet: '未设定',
    sourceAnalysisExtract: '章节分析提取',
    sourceManualAdd: '手动添加',

    // Plant modal
    markPlantTitle: '标记伏笔埋入',
    selectPlantChapter: '选择埋入章节',
    selectChapterRequired: '请选择章节',
    selectChapter: '选择章节',
    chapterOption: '第{{num}}章 - {{title}}',
    hintTextOptional: '暗示文本（可选）',
    hintTextPlantPlaceholder: '记录埋伏笔时使用的暗示性描写',

    // Resolve modal
    markResolveTitle: '标记伏笔回收',
    selectResolveChapter: '选择回收章节',
    resolutionTextOptional: '揭示文本（可选）',
    resolutionTextPlaceholder: '记录回收伏笔时的揭示内容',
    isPartialLabel: '是否部分回收',
    partial: '部分',
    complete: '完全',

    // Sync modal
    startSync: '开始同步',
    tip: '提示',
    syncDescription: '通常情况下，章节分析完成后伏笔会自动同步到伏笔管理中。此功能用于手动补充同步可能遗漏的伏笔。',
    syncParagraph: '此操作将从已完成的章节分析结果中提取伏笔信息，同步到伏笔管理表。',
    syncNote1: '已存在的伏笔记录不会被覆盖',
    syncNote2: '新同步的伏笔将自动设置为"已埋入"状态',
    syncNote3: '同步完成后可在列表中查看和编辑',
  },
};

const en = {
  foreshadows: {
    // Status labels
    statusPending: 'To plant',
    statusPlanted: 'Planted',
    statusResolved: 'Resolved',
    statusPartiallyResolved: 'Partially resolved',
    statusAbandoned: 'Abandoned',

    // Category labels
    categoryIdentity: 'Origin',
    categoryMystery: 'Suspense',
    categoryItem: 'Item',
    categoryRelationship: 'Relationship',
    categoryEvent: 'Event',
    categoryAbility: 'Ability',
    categoryProphecy: 'Prophecy',

    // Table column titles
    colStatus: 'Status',
    colTitle: 'Title',
    longTermShort: 'Long-term',
    category: 'Category',
    colPlantChapter: 'Planted in',
    planResolve: 'Planned resolve',
    colImportance: 'Importance',
    colSource: 'Source',
    colActions: 'Actions',

    // Source values
    sourceAnalysis: 'Analysis',
    sourceManual: 'Manual',

    // Units
    chapterNumber: 'Chapter {{num}}',

    // Urgency badges
    overdueChapter: 'Overdue by {{count}} chapter(s)',
    remainingChapter: '{{count}} chapter(s) left',

    // Tooltips / confirmations
    viewDetails: 'View details',
    edit: 'Edit',
    markPlant: 'Mark as planted',
    markResolve: 'Mark as resolved',
    abandon: 'Abandon',
    delete: 'Delete',
    confirmAbandon: 'Are you sure you want to abandon this foreshadow?',
    confirmDelete: 'Are you sure you want to delete this foreshadow?',

    // Stats
    statTotal: 'Total',
    statLongTerm: 'Long-term foreshadows',
    statOverdue: 'Overdue & unresolved',

    // Alerts
    overdueAlertMessage: '{{count}} foreshadow(s) are overdue and unresolved',
    overdueAlertDesc: 'Please resolve these foreshadows in upcoming chapters as soon as possible, or adjust their planned resolve chapters',
    autoSyncNotice: 'Foreshadow data is synced automatically after chapter analysis, no manual action needed',

    // Toolbar
    filterStatus: 'Filter by status',
    filterCategory: 'Filter by category',
    filterSource: 'Filter by source',
    refreshList: 'Refresh list',
    manualSync: 'Manually sync analyzed foreshadows',
    more: 'More',
    addForeshadow: 'Add foreshadow',
    emptyText: 'No foreshadows yet, click the top right to add',
    totalItems: 'Total {{total}}',

    // Action feedback
    createSuccess: 'Foreshadow created successfully',
    updateSuccess: 'Foreshadow updated successfully',
    deleteSuccess: 'Foreshadow deleted successfully',
    plantSuccess: 'Foreshadow marked as planted',
    resolveSuccess: 'Foreshadow marked as resolved',
    abandonSuccess: 'Foreshadow marked as abandoned',
    syncComplete: 'Sync complete: {{synced}} foreshadow(s) added, {{skipped}} skipped',

    // Edit / create modal
    editForeshadow: 'Edit foreshadow',
    fieldTitle: 'Foreshadow title',
    titleRequired: 'Please enter a title',
    titlePlaceholder: 'Briefly describe the foreshadow content',
    selectCategory: 'Select a category',
    fieldContent: 'Foreshadow content',
    contentRequired: 'Please enter the content',
    contentPlaceholder: 'Describe the content and intent of the foreshadow in detail',
    planPlant: 'Planned plant',
    chapterNumberPlaceholder: 'Chapter number',
    relatedCharacters: 'Related characters',
    selectRelatedCharacters: 'Select related characters',
    importanceRange: 'Importance (0-1)',
    strengthRange: 'Strength (1-10)',
    subtletyRange: 'Subtlety (1-10)',
    longTermForeshadow: 'Long-term foreshadow',
    yes: 'Yes',
    no: 'No',
    hintText: 'Hint text',
    hintTextPlaceholder: 'Hint description used when planting the foreshadow',
    notes: 'Notes',
    notesPlaceholder: 'Author notes (visible only to the author)',
    aiAssistSettings: 'AI assistance settings',
    autoRemind: 'Auto remind',
    on: 'On',
    off: 'Off',
    includeInContext: 'Include in generation context',
    remindBefore: 'Remind how many chapters ahead',

    // Detail modal
    detailTitle: 'Foreshadow details',
    close: 'Close',
    contentLabel: 'Foreshadow content:',
    hintTextLabel: 'Hint text:',
    resolutionTextLabel: 'Reveal text:',
    plantChapterLabel: 'Planted in:',
    planResolveLabel: 'Planned resolve:',
    actualResolveLabel: 'Actual resolve:',
    importanceLabel: 'Importance:',
    strengthLabel: 'Strength:',
    subtletyLabel: 'Subtlety:',
    relatedCharactersLabel: 'Related characters:',
    notesLabel: 'Notes:',
    sourceLabel: 'Source:',
    notSet: 'Not set',
    sourceAnalysisExtract: 'Extracted from chapter analysis',
    sourceManualAdd: 'Added manually',

    // Plant modal
    markPlantTitle: 'Mark foreshadow as planted',
    selectPlantChapter: 'Select plant chapter',
    selectChapterRequired: 'Please select a chapter',
    selectChapter: 'Select a chapter',
    chapterOption: 'Chapter {{num}} - {{title}}',
    hintTextOptional: 'Hint text (optional)',
    hintTextPlantPlaceholder: 'Record the hint description used when planting the foreshadow',

    // Resolve modal
    markResolveTitle: 'Mark foreshadow as resolved',
    selectResolveChapter: 'Select resolve chapter',
    resolutionTextOptional: 'Reveal text (optional)',
    resolutionTextPlaceholder: 'Record the reveal content when resolving the foreshadow',
    isPartialLabel: 'Partially resolved',
    partial: 'Partial',
    complete: 'Complete',

    // Sync modal
    startSync: 'Start sync',
    tip: 'Tip',
    syncDescription: 'Normally, foreshadows are synced automatically to Foreshadow Management after chapter analysis is complete. This feature is for manually syncing any foreshadows that may have been missed.',
    syncParagraph: 'This operation extracts foreshadow information from completed chapter analysis results and syncs it to the foreshadow management table.',
    syncNote1: 'Existing foreshadow records will not be overwritten',
    syncNote2: 'Newly synced foreshadows will automatically be set to "Planted" status',
    syncNote3: 'After syncing, you can view and edit them in the list',
  },
};

const vi = {
  foreshadows: {
    // Status labels
    statusPending: 'Chờ cài cắm',
    statusPlanted: 'Đã cài cắm',
    statusResolved: 'Đã thu hồi',
    statusPartiallyResolved: 'Thu hồi một phần',
    statusAbandoned: 'Đã bỏ',

    // Category labels
    categoryIdentity: 'Thân thế',
    categoryMystery: 'Hồi hộp',
    categoryItem: 'Vật phẩm',
    categoryRelationship: 'Quan hệ',
    categoryEvent: 'Sự kiện',
    categoryAbility: 'Năng lực',
    categoryProphecy: 'Lời tiên tri',

    // Table column titles
    colStatus: 'Trạng thái',
    colTitle: 'Tiêu đề',
    longTermShort: 'Dài kỳ',
    category: 'Phân loại',
    colPlantChapter: 'Chương cài cắm',
    planResolve: 'Dự kiến thu hồi',
    colImportance: 'Mức quan trọng',
    colSource: 'Nguồn',
    colActions: 'Thao tác',

    // Source values
    sourceAnalysis: 'Phân tích',
    sourceManual: 'Thủ công',

    // Units
    chapterNumber: 'Chương {{num}}',

    // Urgency badges
    overdueChapter: 'Quá hạn {{count}} chương',
    remainingChapter: 'Còn {{count}} chương',

    // Tooltips / confirmations
    viewDetails: 'Xem chi tiết',
    edit: 'Sửa',
    markPlant: 'Đánh dấu cài cắm',
    markResolve: 'Đánh dấu thu hồi',
    abandon: 'Bỏ',
    delete: 'Xóa',
    confirmAbandon: 'Bạn có chắc muốn bỏ phục bút này không?',
    confirmDelete: 'Bạn có chắc muốn xóa phục bút này không?',

    // Stats
    statTotal: 'Tổng cộng',
    statLongTerm: 'Phục bút dài kỳ',
    statOverdue: 'Quá hạn chưa thu hồi',

    // Alerts
    overdueAlertMessage: 'Có {{count}} phục bút đã quá hạn chưa thu hồi',
    overdueAlertDesc: 'Vui lòng thu hồi các phục bút này trong các chương tiếp theo sớm nhất có thể, hoặc điều chỉnh chương dự kiến thu hồi',
    autoSyncNotice: 'Dữ liệu phục bút sẽ tự động đồng bộ sau khi phân tích chương hoàn tất, không cần thao tác thủ công',

    // Toolbar
    filterStatus: 'Lọc theo trạng thái',
    filterCategory: 'Lọc theo phân loại',
    filterSource: 'Lọc theo nguồn',
    refreshList: 'Làm mới danh sách',
    manualSync: 'Đồng bộ thủ công phục bút phân tích',
    more: 'Thêm',
    addForeshadow: 'Thêm phục bút',
    emptyText: 'Chưa có phục bút, nhấn vào góc trên bên phải để thêm',
    totalItems: 'Tổng {{total}}',

    // Action feedback
    createSuccess: 'Tạo phục bút thành công',
    updateSuccess: 'Cập nhật phục bút thành công',
    deleteSuccess: 'Xóa phục bút thành công',
    plantSuccess: 'Phục bút đã được đánh dấu cài cắm',
    resolveSuccess: 'Phục bút đã được đánh dấu thu hồi',
    abandonSuccess: 'Phục bút đã được đánh dấu bỏ',
    syncComplete: 'Đồng bộ hoàn tất: thêm {{synced}} phục bút, bỏ qua {{skipped}}',

    // Edit / create modal
    editForeshadow: 'Sửa phục bút',
    fieldTitle: 'Tiêu đề phục bút',
    titleRequired: 'Vui lòng nhập tiêu đề',
    titlePlaceholder: 'Mô tả ngắn gọn nội dung phục bút',
    selectCategory: 'Chọn phân loại',
    fieldContent: 'Nội dung phục bút',
    contentRequired: 'Vui lòng nhập nội dung',
    contentPlaceholder: 'Mô tả chi tiết nội dung và ý đồ của phục bút',
    planPlant: 'Dự kiến cài cắm',
    chapterNumberPlaceholder: 'Số chương',
    relatedCharacters: 'Nhân vật liên quan',
    selectRelatedCharacters: 'Chọn nhân vật liên quan',
    importanceRange: 'Mức quan trọng (0-1)',
    strengthRange: 'Độ mạnh (1-10)',
    subtletyRange: 'Độ ẩn (1-10)',
    longTermForeshadow: 'Phục bút dài kỳ',
    yes: 'Có',
    no: 'Không',
    hintText: 'Văn bản gợi ý',
    hintTextPlaceholder: 'Mô tả gợi ý dùng khi cài cắm phục bút',
    notes: 'Ghi chú',
    notesPlaceholder: 'Ghi chú sáng tác (chỉ tác giả thấy)',
    aiAssistSettings: 'Thiết lập hỗ trợ AI',
    autoRemind: 'Tự động nhắc nhở',
    on: 'Bật',
    off: 'Tắt',
    includeInContext: 'Bao gồm trong ngữ cảnh tạo',
    remindBefore: 'Nhắc trước mấy chương',

    // Detail modal
    detailTitle: 'Chi tiết phục bút',
    close: 'Đóng',
    contentLabel: 'Nội dung phục bút:',
    hintTextLabel: 'Văn bản gợi ý:',
    resolutionTextLabel: 'Văn bản tiết lộ:',
    plantChapterLabel: 'Chương cài cắm:',
    planResolveLabel: 'Dự kiến thu hồi:',
    actualResolveLabel: 'Thực tế thu hồi:',
    importanceLabel: 'Mức quan trọng:',
    strengthLabel: 'Độ mạnh:',
    subtletyLabel: 'Độ ẩn:',
    relatedCharactersLabel: 'Nhân vật liên quan:',
    notesLabel: 'Ghi chú:',
    sourceLabel: 'Nguồn:',
    notSet: 'Chưa đặt',
    sourceAnalysisExtract: 'Trích xuất từ phân tích chương',
    sourceManualAdd: 'Thêm thủ công',

    // Plant modal
    markPlantTitle: 'Đánh dấu phục bút cài cắm',
    selectPlantChapter: 'Chọn chương cài cắm',
    selectChapterRequired: 'Vui lòng chọn chương',
    selectChapter: 'Chọn chương',
    chapterOption: 'Chương {{num}} - {{title}}',
    hintTextOptional: 'Văn bản gợi ý (không bắt buộc)',
    hintTextPlantPlaceholder: 'Ghi lại mô tả gợi ý dùng khi cài cắm phục bút',

    // Resolve modal
    markResolveTitle: 'Đánh dấu phục bút thu hồi',
    selectResolveChapter: 'Chọn chương thu hồi',
    resolutionTextOptional: 'Văn bản tiết lộ (không bắt buộc)',
    resolutionTextPlaceholder: 'Ghi lại nội dung tiết lộ khi thu hồi phục bút',
    isPartialLabel: 'Thu hồi một phần',
    partial: 'Một phần',
    complete: 'Hoàn toàn',

    // Sync modal
    startSync: 'Bắt đầu đồng bộ',
    tip: 'Gợi ý',
    syncDescription: 'Thông thường, sau khi phân tích chương hoàn tất, phục bút sẽ tự động đồng bộ vào Quản lý phục bút. Chức năng này dùng để bổ sung thủ công những phục bút có thể bị bỏ sót.',
    syncParagraph: 'Thao tác này sẽ trích xuất thông tin phục bút từ kết quả phân tích chương đã hoàn thành và đồng bộ vào bảng quản lý phục bút.',
    syncNote1: 'Các bản ghi phục bút đã tồn tại sẽ không bị ghi đè',
    syncNote2: 'Phục bút mới đồng bộ sẽ tự động được đặt ở trạng thái "Đã cài cắm"',
    syncNote3: 'Sau khi đồng bộ xong, có thể xem và chỉnh sửa trong danh sách',
  },
};

export default { zh, en, vi };
