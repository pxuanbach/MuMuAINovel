const zh = {
  wizard: {
    // Page chrome
    title: '创建新项目',
    intro: '填写基本信息后，AI将自动为您生成世界观、角色和大纲节点（大纲可在项目内手动展开为章节）',
    wizardTitle: '项目创建向导',
    backHome: '返回首页',
    back: '返回',
    createButton: '开始创建项目',

    // Form labels
    labelTitle: '书名',
    labelDescription: '小说简介',
    labelTheme: '主题',
    labelGenre: '类型',
    labelOutlineMode: '大纲章节模式',
    labelNarrativePerspective: '叙事视角',
    labelCharacterCount: '角色数量',
    labelTargetWords: '目标字数',

    // Validation messages
    titleRequired: '请输入书名',
    descriptionRequired: '请输入小说简介',
    themeRequired: '请输入主题',
    genreRequired: '请选择小说类型',
    outlineModeRequired: '请选择大纲章节模式',
    narrativePerspectiveRequired: '请选择叙事视角',
    characterCountRequired: '请输入角色数量',
    targetWordsRequired: '请输入目标字数',

    // Placeholders / tooltips / units
    titlePlaceholder: '输入你的小说标题',
    descriptionPlaceholder: '用一段话介绍你的小说...',
    themePlaceholder: '描述你的小说主题...',
    genrePlaceholder: '选择或输入类型标签（如：玄幻、都市、修仙）',
    outlineModeTooltip: '创建后不可更改，请根据创作习惯选择',
    narrativePerspectivePlaceholder: '选择小说的叙事视角',
    characterCountPlaceholder: 'AI生成的角色数量',
    targetWordsPlaceholder: '整部小说的目标字数',
    characterUnit: '个',
    wordsUnit: '字',

    // Outline mode options
    outlineTraditional: '传统模式 (1→1)',
    outlineTraditionalDesc: '一个大纲对应一个章节，简单直接',
    outlineTraditionalSuitable: '💡 适合：简单剧情、快速创作、短篇小说',
    outlineDetailed: '细化模式 (1→N) 推荐',
    outlineDetailedDesc: '一个大纲可展开为多个章节，灵活控制',
    outlineDetailedSuitable: '💡 适合：复杂剧情、长篇创作、需要细化控制',

    // Genre labels (display only; values stay Chinese)
    genreXuanhuan: '玄幻',
    genreUrban: '都市',
    genreHistorical: '历史',
    genreSciFi: '科幻',
    genreWuxia: '武侠',
    genreXianxia: '仙侠',
    genreFantasy: '奇幻',
    genreMystery: '悬疑',
    genreRomance: '言情',
    genreCultivation: '修仙',

    // Narrative perspective labels (display only; values stay Chinese)
    narrativeFirst: '第一人称',
    narrativeThird: '第三人称',
    narrativeOmniscient: '全知视角',

    // Page-level toasts
    fetchProjectFailed: '获取项目信息失败',
    resumeFailedRetry: '恢复生成失败,请重试',

    // Restart confirm modal
    restartConfirmTitle: '确认重新开始生成',
    restartConfirmContent: '当前生成进度将被放弃，并返回灵感对话重新配置。已创建的项目数据不会自动删除。',
    restartConfirmOk: '重新开始',
    restartConfirmCancel: '取消',

    // Generation steps
    stepWorldBuilding: '生成世界观',
    stepCareerSystem: '生成职业体系',
    stepCharacters: '生成角色',
    stepOutline: '生成大纲',

    // Step status
    statusCompleted: '已完成',
    statusProcessing: '进行中',
    statusFailed: '失败',
    statusPending: '等待中',

    // Progress messages
    checkingProjectStatus: '检查项目状态...',
    startingCreation: '开始创建项目...',
    generatingWorldBuilding: '正在生成世界观...',
    generatingCareers: '正在生成职业体系...',
    generatingCharacters: '正在生成角色...',
    generatingOutline: '正在生成大纲...',
    regeneratingWorldBuilding: '重新生成世界观...',
    regeneratingCareers: '重新生成职业体系...',
    regeneratingCharacters: '重新生成角色...',
    regeneratingOutline: '重新生成大纲...',
    creationComplete: '项目创建完成！正在跳转...',

    // Resume / retry toasts
    resumeStartFromWorldBuilding: '从世界观步骤开始生成...',
    resumeContinueCareers: '世界观已完成，从职业体系步骤继续...',
    resumeContinueCharacters: '职业体系已完成，从角色步骤继续...',
    resumeContinueOutline: '角色已完成，从大纲步骤继续...',
    resumeAlreadyComplete: '项目已完成,正在跳转...',
    projectCreatedSuccess: '项目创建成功！正在进入项目...',
    missingGenerationData: '缺少生成数据',
    retryStartWorldBuilding: '从世界观步骤开始重新生成...',
    retryContinueCareers: '从职业体系步骤继续生成...',
    retryContinueCharacters: '从角色步骤继续生成...',
    retryContinueOutline: '从大纲步骤继续生成...',
    missingDataContinueCareers: '缺少必要数据，无法从职业体系步骤继续',
    missingProjectIdContinueCareers: '缺少项目ID，无法从职业体系步骤继续',
    missingDataContinueCharacters: '缺少必要数据，无法从角色步骤继续',
    missingProjectIdContinueCharacters: '缺少项目ID，无法从角色步骤继续',
    missingDataContinueOutline: '缺少必要数据，无法从大纲步骤继续',
    missingProjectIdContinueOutline: '缺少项目ID，无法从大纲步骤继续',
    projectCreationFailedNoId: '项目创建失败：未获取到项目ID',
    unknownError: '未知错误',
    resumeFailed: '恢复生成失败：',
    createProjectFailed: '创建项目失败：',
    retryFailed: '重试失败：',

    // Error details
    worldBuildingFailed: '世界观生成失败: {{error}}',
    careersFailed: '职业体系生成失败: {{error}}',
    charactersFailed: '角色生成失败: {{error}}',
    outlineFailed: '大纲生成失败: {{error}}',

    // Headings / hints
    generatingFor: '正在为《{{title}}》生成内容',
    interruptedParagraph: '生成流程中断，已保留当前进度与上下文信息，可从失败步骤继续重试。',
    normalParagraph: '系统会依次生成世界观、职业体系、角色与大纲，请耐心等待。',
    currentProgress: '当前进度',
    errorDetailsTitle: '错误详情',
    retryHint: '可点击下方智能重试，从失败节点继续生成，避免重复执行已完成步骤。',
    doNotCloseAutoEnter: '请勿关闭页面，生成完成后将自动进入项目详情页。',
    smartRetry: '智能重试',
    restartGeneration: '重新开始生成',
  },
};

const en = {
  wizard: {
    // Page chrome
    title: 'Create New Project',
    intro: 'Fill in the basic information and the AI will automatically generate the worldbuilding, characters and outline nodes for you (the outline can be manually expanded into chapters inside the project).',
    wizardTitle: 'Project Creation Wizard',
    backHome: 'Back to Home',
    back: 'Back',
    createButton: 'Start Creating Project',

    // Form labels
    labelTitle: 'Title',
    labelDescription: 'Synopsis',
    labelTheme: 'Theme',
    labelGenre: 'Genre',
    labelOutlineMode: 'Outline / Chapter Mode',
    labelNarrativePerspective: 'Narrative Perspective',
    labelCharacterCount: 'Number of Characters',
    labelTargetWords: 'Target Word Count',

    // Validation messages
    titleRequired: 'Please enter the title',
    descriptionRequired: 'Please enter the synopsis',
    themeRequired: 'Please enter the theme',
    genreRequired: 'Please select a genre',
    outlineModeRequired: 'Please select an outline / chapter mode',
    narrativePerspectiveRequired: 'Please select a narrative perspective',
    characterCountRequired: 'Please enter the number of characters',
    targetWordsRequired: 'Please enter the target word count',

    // Placeholders / tooltips / units
    titlePlaceholder: 'Enter your novel title',
    descriptionPlaceholder: 'Introduce your novel in a paragraph...',
    themePlaceholder: 'Describe your novel theme...',
    genrePlaceholder: 'Select or type genre tags (e.g. Eastern Fantasy, Urban, Cultivation)',
    outlineModeTooltip: 'Cannot be changed after creation; choose according to your writing habits',
    narrativePerspectivePlaceholder: 'Select the narrative perspective of the novel',
    characterCountPlaceholder: 'Number of characters the AI generates',
    targetWordsPlaceholder: 'Target word count of the whole novel',
    characterUnit: '',
    wordsUnit: 'words',

    // Outline mode options
    outlineTraditional: 'Traditional (1→1)',
    outlineTraditionalDesc: 'One outline maps to one chapter, simple and direct',
    outlineTraditionalSuitable: '💡 Best for: simple plots, fast writing, short stories',
    outlineDetailed: 'Detailed (1→N) Recommended',
    outlineDetailedDesc: 'One outline can expand into multiple chapters, flexible control',
    outlineDetailedSuitable: '💡 Best for: complex plots, long-form writing, fine-grained control',

    // Genre labels (display only; values stay Chinese)
    genreXuanhuan: 'Eastern Fantasy',
    genreUrban: 'Urban',
    genreHistorical: 'Historical',
    genreSciFi: 'Sci-Fi',
    genreWuxia: 'Wuxia / Martial Arts',
    genreXianxia: 'Xianxia / Immortal Heroes',
    genreFantasy: 'Fantasy',
    genreMystery: 'Mystery',
    genreRomance: 'Romance',
    genreCultivation: 'Cultivation',

    // Narrative perspective labels (display only; values stay Chinese)
    narrativeFirst: 'First person',
    narrativeThird: 'Third person',
    narrativeOmniscient: 'Omniscient',

    // Page-level toasts
    fetchProjectFailed: 'Failed to fetch project information',
    resumeFailedRetry: 'Failed to resume generation, please try again',

    // Restart confirm modal
    restartConfirmTitle: 'Confirm Restart Generation',
    restartConfirmContent: 'The current generation progress will be discarded and you will return to the inspiration chat to reconfigure. Already created project data will not be deleted automatically.',
    restartConfirmOk: 'Restart',
    restartConfirmCancel: 'Cancel',

    // Generation steps
    stepWorldBuilding: 'Generate Worldbuilding',
    stepCareerSystem: 'Generate Career System',
    stepCharacters: 'Generate Characters',
    stepOutline: 'Generate Outline',

    // Step status
    statusCompleted: 'Completed',
    statusProcessing: 'In progress',
    statusFailed: 'Failed',
    statusPending: 'Waiting',

    // Progress messages
    checkingProjectStatus: 'Checking project status...',
    startingCreation: 'Starting project creation...',
    generatingWorldBuilding: 'Generating worldbuilding...',
    generatingCareers: 'Generating career system...',
    generatingCharacters: 'Generating characters...',
    generatingOutline: 'Generating outline...',
    regeneratingWorldBuilding: 'Regenerating worldbuilding...',
    regeneratingCareers: 'Regenerating career system...',
    regeneratingCharacters: 'Regenerating characters...',
    regeneratingOutline: 'Regenerating outline...',
    creationComplete: 'Project created! Redirecting...',

    // Resume / retry toasts
    resumeStartFromWorldBuilding: 'Starting generation from the worldbuilding step...',
    resumeContinueCareers: 'Worldbuilding completed, continuing from the career system step...',
    resumeContinueCharacters: 'Career system completed, continuing from the characters step...',
    resumeContinueOutline: 'Characters completed, continuing from the outline step...',
    resumeAlreadyComplete: 'Project already completed, redirecting...',
    projectCreatedSuccess: 'Project created successfully! Entering the project...',
    missingGenerationData: 'Missing generation data',
    retryStartWorldBuilding: 'Regenerating from the worldbuilding step...',
    retryContinueCareers: 'Continuing generation from the career system step...',
    retryContinueCharacters: 'Continuing generation from the characters step...',
    retryContinueOutline: 'Continuing generation from the outline step...',
    missingDataContinueCareers: 'Missing required data, cannot continue from the career system step',
    missingProjectIdContinueCareers: 'Missing project ID, cannot continue from the career system step',
    missingDataContinueCharacters: 'Missing required data, cannot continue from the characters step',
    missingProjectIdContinueCharacters: 'Missing project ID, cannot continue from the characters step',
    missingDataContinueOutline: 'Missing required data, cannot continue from the outline step',
    missingProjectIdContinueOutline: 'Missing project ID, cannot continue from the outline step',
    projectCreationFailedNoId: 'Project creation failed: no project ID returned',
    unknownError: 'Unknown error',
    resumeFailed: 'Failed to resume generation: ',
    createProjectFailed: 'Failed to create project: ',
    retryFailed: 'Retry failed: ',

    // Error details
    worldBuildingFailed: 'Worldbuilding generation failed: {{error}}',
    careersFailed: 'Career system generation failed: {{error}}',
    charactersFailed: 'Character generation failed: {{error}}',
    outlineFailed: 'Outline generation failed: {{error}}',

    // Headings / hints
    generatingFor: 'Generating content for "{{title}}"',
    interruptedParagraph: 'The generation flow was interrupted. The current progress and context have been preserved, and you can retry from the failed step.',
    normalParagraph: 'The system will generate the worldbuilding, career system, characters and outline in sequence. Please wait patiently.',
    currentProgress: 'Current Progress',
    errorDetailsTitle: 'Error Details',
    retryHint: 'Click Smart Retry below to continue generation from the failed node and avoid repeating completed steps.',
    doNotCloseAutoEnter: 'Do not close this page; you will be taken to the project detail page automatically once generation completes.',
    smartRetry: 'Smart Retry',
    restartGeneration: 'Restart Generation',
  },
};

const vi = {
  wizard: {
    // Page chrome
    title: 'Tạo dự án mới',
    intro: 'Sau khi điền thông tin cơ bản, AI sẽ tự động tạo thế giới quan, nhân vật và các nút dàn ý cho bạn (dàn ý có thể được mở rộng thủ công thành chương trong dự án).',
    wizardTitle: 'Trình hướng dẫn tạo dự án',
    backHome: 'Về trang chủ',
    back: 'Quay lại',
    createButton: 'Bắt đầu tạo dự án',

    // Form labels
    labelTitle: 'Tên sách',
    labelDescription: 'Tóm tắt truyện',
    labelTheme: 'Chủ đề',
    labelGenre: 'Thể loại',
    labelOutlineMode: 'Chế độ dàn ý / chương',
    labelNarrativePerspective: 'Ngôi kể',
    labelCharacterCount: 'Số lượng nhân vật',
    labelTargetWords: 'Số chữ mục tiêu',

    // Validation messages
    titleRequired: 'Vui lòng nhập tên sách',
    descriptionRequired: 'Vui lòng nhập tóm tắt truyện',
    themeRequired: 'Vui lòng nhập chủ đề',
    genreRequired: 'Vui lòng chọn thể loại truyện',
    outlineModeRequired: 'Vui lòng chọn chế độ dàn ý / chương',
    narrativePerspectiveRequired: 'Vui lòng chọn ngôi kể',
    characterCountRequired: 'Vui lòng nhập số lượng nhân vật',
    targetWordsRequired: 'Vui lòng nhập số chữ mục tiêu',

    // Placeholders / tooltips / units
    titlePlaceholder: 'Nhập tiêu đề tiểu thuyết của bạn',
    descriptionPlaceholder: 'Giới thiệu tiểu thuyết của bạn trong một đoạn...',
    themePlaceholder: 'Mô tả chủ đề tiểu thuyết của bạn...',
    genrePlaceholder: 'Chọn hoặc nhập thẻ thể loại (ví dụ: Huyền huyễn, Đô thị, Tu tiên)',
    outlineModeTooltip: 'Không thể thay đổi sau khi tạo, hãy chọn theo thói quen sáng tác của bạn',
    narrativePerspectivePlaceholder: 'Chọn ngôi kể của tiểu thuyết',
    characterCountPlaceholder: 'Số lượng nhân vật AI tạo',
    targetWordsPlaceholder: 'Số chữ mục tiêu của toàn bộ tiểu thuyết',
    characterUnit: '',
    wordsUnit: 'chữ',

    // Outline mode options
    outlineTraditional: 'Chế độ truyền thống (1→1)',
    outlineTraditionalDesc: 'Một dàn ý tương ứng một chương, đơn giản trực tiếp',
    outlineTraditionalSuitable: '💡 Phù hợp: cốt truyện đơn giản, sáng tác nhanh, truyện ngắn',
    outlineDetailed: 'Chế độ chi tiết (1→N) Đề xuất',
    outlineDetailedDesc: 'Một dàn ý có thể mở rộng thành nhiều chương, kiểm soát linh hoạt',
    outlineDetailedSuitable: '💡 Phù hợp: cốt truyện phức tạp, sáng tác dài kỳ, cần kiểm soát chi tiết',

    // Genre labels (display only; values stay Chinese)
    genreXuanhuan: 'Huyền huyễn',
    genreUrban: 'Đô thị',
    genreHistorical: 'Lịch sử',
    genreSciFi: 'Khoa huyễn',
    genreWuxia: 'Võ hiệp',
    genreXianxia: 'Tiên hiệp',
    genreFantasy: 'Kỳ huyễn',
    genreMystery: 'Huyền nghi',
    genreRomance: 'Ngôn tình',
    genreCultivation: 'Tu tiên',

    // Narrative perspective labels (display only; values stay Chinese)
    narrativeFirst: 'Ngôi thứ nhất',
    narrativeThird: 'Ngôi thứ ba',
    narrativeOmniscient: 'Toàn tri',

    // Page-level toasts
    fetchProjectFailed: 'Lấy thông tin dự án thất bại',
    resumeFailedRetry: 'Khôi phục tạo thất bại, vui lòng thử lại',

    // Restart confirm modal
    restartConfirmTitle: 'Xác nhận bắt đầu lại tạo',
    restartConfirmContent: 'Tiến trình tạo hiện tại sẽ bị hủy bỏ và quay lại cuộc trò chuyện cảm hứng để cấu hình lại. Dữ liệu dự án đã tạo sẽ không tự động bị xóa.',
    restartConfirmOk: 'Bắt đầu lại',
    restartConfirmCancel: 'Hủy',

    // Generation steps
    stepWorldBuilding: 'Tạo thế giới quan',
    stepCareerSystem: 'Tạo hệ thống nghề nghiệp',
    stepCharacters: 'Tạo nhân vật',
    stepOutline: 'Tạo dàn ý',

    // Step status
    statusCompleted: 'Đã hoàn thành',
    statusProcessing: 'Đang thực hiện',
    statusFailed: 'Thất bại',
    statusPending: 'Đang chờ',

    // Progress messages
    checkingProjectStatus: 'Đang kiểm tra trạng thái dự án...',
    startingCreation: 'Bắt đầu tạo dự án...',
    generatingWorldBuilding: 'Đang tạo thế giới quan...',
    generatingCareers: 'Đang tạo hệ thống nghề nghiệp...',
    generatingCharacters: 'Đang tạo nhân vật...',
    generatingOutline: 'Đang tạo dàn ý...',
    regeneratingWorldBuilding: 'Tạo lại thế giới quan...',
    regeneratingCareers: 'Tạo lại hệ thống nghề nghiệp...',
    regeneratingCharacters: 'Tạo lại nhân vật...',
    regeneratingOutline: 'Tạo lại dàn ý...',
    creationComplete: 'Tạo dự án hoàn tất! Đang chuyển hướng...',

    // Resume / retry toasts
    resumeStartFromWorldBuilding: 'Bắt đầu tạo từ bước thế giới quan...',
    resumeContinueCareers: 'Thế giới quan đã hoàn thành, tiếp tục từ bước hệ thống nghề nghiệp...',
    resumeContinueCharacters: 'Hệ thống nghề nghiệp đã hoàn thành, tiếp tục từ bước nhân vật...',
    resumeContinueOutline: 'Nhân vật đã hoàn thành, tiếp tục từ bước dàn ý...',
    resumeAlreadyComplete: 'Dự án đã hoàn thành, đang chuyển hướng...',
    projectCreatedSuccess: 'Tạo dự án thành công! Đang vào dự án...',
    missingGenerationData: 'Thiếu dữ liệu tạo',
    retryStartWorldBuilding: 'Tạo lại từ bước thế giới quan...',
    retryContinueCareers: 'Tiếp tục tạo từ bước hệ thống nghề nghiệp...',
    retryContinueCharacters: 'Tiếp tục tạo từ bước nhân vật...',
    retryContinueOutline: 'Tiếp tục tạo từ bước dàn ý...',
    missingDataContinueCareers: 'Thiếu dữ liệu cần thiết, không thể tiếp tục từ bước hệ thống nghề nghiệp',
    missingProjectIdContinueCareers: 'Thiếu ID dự án, không thể tiếp tục từ bước hệ thống nghề nghiệp',
    missingDataContinueCharacters: 'Thiếu dữ liệu cần thiết, không thể tiếp tục từ bước nhân vật',
    missingProjectIdContinueCharacters: 'Thiếu ID dự án, không thể tiếp tục từ bước nhân vật',
    missingDataContinueOutline: 'Thiếu dữ liệu cần thiết, không thể tiếp tục từ bước dàn ý',
    missingProjectIdContinueOutline: 'Thiếu ID dự án, không thể tiếp tục từ bước dàn ý',
    projectCreationFailedNoId: 'Tạo dự án thất bại: không nhận được ID dự án',
    unknownError: 'Lỗi không xác định',
    resumeFailed: 'Khôi phục tạo thất bại: ',
    createProjectFailed: 'Tạo dự án thất bại: ',
    retryFailed: 'Thử lại thất bại: ',

    // Error details
    worldBuildingFailed: 'Tạo thế giới quan thất bại: {{error}}',
    careersFailed: 'Tạo hệ thống nghề nghiệp thất bại: {{error}}',
    charactersFailed: 'Tạo nhân vật thất bại: {{error}}',
    outlineFailed: 'Tạo dàn ý thất bại: {{error}}',

    // Headings / hints
    generatingFor: 'Đang tạo nội dung cho "{{title}}"',
    interruptedParagraph: 'Quá trình tạo bị gián đoạn, tiến trình và ngữ cảnh hiện tại đã được giữ lại, bạn có thể thử lại từ bước thất bại.',
    normalParagraph: 'Hệ thống sẽ lần lượt tạo thế giới quan, hệ thống nghề nghiệp, nhân vật và dàn ý, vui lòng chờ đợi.',
    currentProgress: 'Tiến độ hiện tại',
    errorDetailsTitle: 'Chi tiết lỗi',
    retryHint: 'Nhấp vào Thử lại thông minh bên dưới để tiếp tục tạo từ nút thất bại, tránh thực hiện lại các bước đã hoàn thành.',
    doNotCloseAutoEnter: 'Đừng đóng trang, sau khi tạo hoàn tất sẽ tự động vào trang chi tiết dự án.',
    smartRetry: 'Thử lại thông minh',
    restartGeneration: 'Bắt đầu lại tạo',
  },
};

export default { zh, en, vi };
