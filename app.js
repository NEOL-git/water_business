// Dashboard Data and Functionality
class WaterResourcesDashboard {
    constructor() {
        this.data = null;
        this.charts = {};
        this.currentTab = 0;
        this.tableData = [];
        this.filteredData = [];
        this.pastelColors = {
            primary: '#B8D4F1',    // Primary Pastel Blue
            secondary: '#C1E7D0',  // Secondary Pastel Green
            purple: '#D4B5F0',     // Pastel Purple
            pink: '#F0B5D4',       // Pastel Pink
            yellow: '#F7E7A1',     // Pastel Yellow
            orange: '#F5C99B',     // Pastel Orange
            teal: '#A8E6CF',       // Pastel Teal
            chartPalette: ['#B8D4F1', '#C1E7D0', '#D4B5F0', '#F0B5D4', '#F7E7A1', '#F5C99B', '#A8E6CF', '#E6D7FF', '#FFE4E6', '#D4F1F4']
        };
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.updateSummaryCards();
            this.initializeCharts();
            this.initializeTabs();
            this.initializeTable();
            this.setupEventListeners();
            this.addFadeInAnimation();
        } catch (error) {
            console.error('Dashboard initialization failed:', error);
        }
    }

    async loadData() {
        // Using the embedded data from the provided JSON
        this.data = {
            "major_categories": [
                {"category": "수자원사업", "budget": 330059, "original": "가. 수자원사업"},
                {"category": "수도사업", "budget": 1481113, "original": "나. 수도사업"},
                {"category": "수변사업", "budget": 1067009, "original": "다. 수변사업"},
                {"category": "재생에너지", "budget": 17111, "original": "라.재생에너지"},
                {"category": "해외사업", "budget": 20136, "original": "마.해외사업"}
            ],
            "top_projects": [
                {"name": "(1) 신도시", "budget": 543918, "category": "다. 수변사업", "full_name": "(1) 신도시"},
                {"name": "(13) 지방상수도(현대화)", "budget": 493464, "category": "나. 수도사업", "full_name": "(13) 지방상수도(현대화)"},
                {"name": "ㅇ 송산그린시티", "budget": 445369, "category": "다. 수변사업", "full_name": "ㅇ 송산그린시티"},
                {"name": "(3) 친수사업", "budget": 399305, "category": "다. 수변사업", "full_name": "(3) 친수사업"},
                {"name": "ㅇ 에코델타시티", "budget": 395197, "category": "다. 수변사업", "full_name": "ㅇ 에코델타시티"},
                {"name": "(9) 기존수도시설 기능개선", "budget": 320000, "category": "나. 수도사업", "full_name": "(9) 기존수도시설 기능개선"},
                {"name": "(1) 광역상수도건설(안정화)", "budget": 238689, "category": "나. 수도사업", "full_name": "(1) 광역상수도건설(안정화)"},
                {"name": "(4) 댐 운영 및 관리", "budget": 148948, "category": "가. 수자원사업", "full_name": "(4) 댐 운영 및 관리"},
                {"name": "(2) 광역상수도건설(확충)", "budget": 138248, "category": "나. 수도사업", "full_name": "(2) 광역상수도건설(확충)"},
                {"name": "(5) 대산임해 해수담수화", "budget": 113924, "category": "나. 수도사업", "full_name": "(5) 대산임해 해수담수화"},
                {"name": "ㅇ 시화멀티테크", "budget": 98549, "category": "다. 수변사업", "full_name": "ㅇ 시화멀티테크"},
                {"name": "ㅇ 충남서부권 광역", "budget": 72021, "category": "나. 수도사업", "full_name": "ㅇ 충남서부권 광역"},
                {"name": "(1) 기존댐 기능개선", "budget": 69347, "category": "가. 수자원사업", "full_name": "(1) 기존댐 기능개선"},
                {"name": "(12) 지방상수도(시설개선)", "budget": 65097, "category": "나. 수도사업", "full_name": "(12) 지방상수도(시설개선)"},
                {"name": "(4) 강원 물산업단지", "budget": 63069, "category": "다. 수변사업", "full_name": "(4) 강원 물산업단지"},
                {"name": "(2) 산업단지", "budget": 60459, "category": "다. 수변사업", "full_name": "(2) 산업단지"},
                {"name": "(3) 공업용수도건설(안정화)", "budget": 59616, "category": "나. 수도사업", "full_name": "(3) 공업용수도건설(안정화)"},
                {"name": "(3) 수자원정책 및 홍수관리", "budget": 59947, "category": "가. 수자원사업", "full_name": "(3) 수자원정책 및 홍수관리"},
                {"name": "ㅇ 구미하이테크", "budget": 56705, "category": "다. 수변사업", "full_name": "ㅇ 구미하이테크"},
                {"name": "ㅇ 스마트댐 안전관리", "budget": 51732, "category": "가. 수자원사업", "full_name": "ㅇ 스마트댐 안전관리"}
            ],
            "budget_analysis": [
                {"name": "ㅇ 남강댐치수", "budget_2024": 190, "total_cost": 380588, "progress_rate": 0.05, "category": "가. 수자원사업"},
                {"name": "ㅇ 충주댐치수", "budget_2024": 16117, "total_cost": 294861, "progress_rate": 5.47, "category": "가. 수자원사업"},
                {"name": "ㅇ 댐안전성강화(Ⅰ)", "budget_2024": 33119, "total_cost": 369352, "progress_rate": 8.97, "category": "가. 수자원사업"},
                {"name": "ㅇ 댐안전성강화(Ⅱ)", "budget_2024": 37054, "total_cost": 504792, "progress_rate": 7.34, "category": "가. 수자원사업"},
                {"name": "ㅇ 스마트댐 안전관리", "budget_2024": 51732, "total_cost": 106056, "progress_rate": 48.78, "category": "가. 수자원사업"},
                {"name": "ㅇ 댐 스마트 수량수질 통합감시", "budget_2024": 4764, "total_cost": 41027, "progress_rate": 11.61, "category": "가. 수자원사업"},
                {"name": "ㅇ 수도권(Ⅰ) 노후관개량(2차)", "budget_2024": 11276, "total_cost": 54562, "progress_rate": 20.67, "category": "나. 수도사업"},
                {"name": "ㅇ 수도권(Ⅳ) 복선화", "budget_2024": 10883, "total_cost": 62136, "progress_rate": 17.51, "category": "나. 수도사업"},
                {"name": "ㅇ 금강광역 노후관개량(2차)", "budget_2024": 1827, "total_cost": 27821, "progress_rate": 6.57, "category": "나. 수도사업"},
                {"name": "ㅇ 동화댐광역 복선화", "budget_2024": 7629, "total_cost": 42605, "progress_rate": 17.9, "category": "나. 수도사업"},
                {"name": "ㅇ 포항광역 복선화", "budget_2024": 16012, "total_cost": 60197, "progress_rate": 26.61, "category": "나. 수도사업"},
                {"name": "ㅇ 고도정수처리시설 도입", "budget_2024": 90290, "total_cost": 477487, "progress_rate": 18.91, "category": "나. 수도사업"},
                {"name": "ㅇ 남강댐광역(1단계) 노후관개량", "budget_2024": 20670, "total_cost": 217653, "progress_rate": 9.5, "category": "나. 수도사업"},
                {"name": "ㅇ 대청댐광역 노후관개량", "budget_2024": 23590, "total_cost": 193476, "progress_rate": 12.19, "category": "나. 수도사업"},
                {"name": "ㅇ 전남남부권광역 복선화", "budget_2024": 22755, "total_cost": 87073, "progress_rate": 26.14, "category": "나. 수도사업"},
                {"name": "ㅇ 태백 광동계통 노후관개량", "budget_2024": 14929, "total_cost": 87281, "progress_rate": 17.1, "category": "나. 수도사업"},
                {"name": "ㅇ 경기북부(1차) 복선화", "budget_2024": 7661, "total_cost": 85237, "progress_rate": 8.99, "category": "나. 수도사업"},
                {"name": "ㅇ 전주권광역 복선화", "budget_2024": 3522, "total_cost": 338124, "progress_rate": 1.04, "category": "나. 수도사업"},
                {"name": "ㅇ 수도권(Ⅴ)인천평택 복선화", "budget_2024": 1772, "total_cost": 185648, "progress_rate": 0.95, "category": "나. 수도사업"},
                {"name": "ㅇ 수도권(Ⅲ) 노후관개량", "budget_2024": 3362, "total_cost": 466441, "progress_rate": 0.72, "category": "나. 수도사업"},
                {"name": "ㅇ 수도권(Ⅳ) 시흥계통 노후관", "budget_2024": 393, "total_cost": 19470, "progress_rate": 2.02, "category": "나. 수도사업"},
                {"name": "ㅇ 보령댐 당진계통 노후관", "budget_2024": 2118, "total_cost": 92544, "progress_rate": 2.29, "category": "나. 수도사업"},
                {"name": "ㅇ 충남서부권 광역", "budget_2024": 72021, "total_cost": 276334, "progress_rate": 26.06, "category": "나. 수도사업"},
                {"name": "ㅇ 한강하류(4차) 급수체계조정", "budget_2024": 38055, "total_cost": 186513, "progress_rate": 20.4, "category": "나. 수도사업"},
                {"name": "ㅇ 금강남부(2차) 급수체계조정", "budget_2024": 5977, "total_cost": 28591, "progress_rate": 20.91, "category": "나. 수도사업"},
                {"name": "ㅇ 남한강(3차) 급수체계조정", "budget_2024": 20498, "total_cost": 83534, "progress_rate": 24.54, "category": "나. 수도사업"},
                {"name": "ㅇ 금산무주(Ⅱ) 광역", "budget_2024": 1697, "total_cost": 91806, "progress_rate": 1.85, "category": "나. 수도사업"},
                {"name": "ㅇ 울산공업 노후관개량", "budget_2024": 9333, "total_cost": 87452, "progress_rate": 10.67, "category": "나. 수도사업"},
                {"name": "ㅇ 광양(Ⅰ)공업 노후관개량", "budget_2024": 26732, "total_cost": 171255, "progress_rate": 15.61, "category": "나. 수도사업"},
                {"name": "ㅇ 광양(Ⅰ)공업 신구계통 노후관개량", "budget_2024": 7258, "total_cost": 78130, "progress_rate": 9.29, "category": "나. 수도사업"},
                {"name": "ㅇ 군산공업 노후관개량", "budget_2024": 14267, "total_cost": 73073, "progress_rate": 19.53, "category": "나. 수도사업"},
                {"name": "ㅇ 아산공업(2차) 복선화", "budget_2024": 1355, "total_cost": 55076, "progress_rate": 2.46, "category": "나. 수도사업"},
                {"name": "ㅇ 울산(Ⅰ) 노후관개량(4차)", "budget_2024": 671, "total_cost": 49977, "progress_rate": 1.34, "category": "나. 수도사업"},
                {"name": "ㅇ 국가산단 용수분기", "budget_2024": 6013, "total_cost": 17418, "progress_rate": 34.53, "category": "나. 수도사업"},
                {"name": "ㅇ 광양 공업가뭄 대비시설", "budget_2024": 1009, "total_cost": 39919, "progress_rate": 2.53, "category": "나. 수도사업"},
                {"name": "(5) 대산임해 해수담수화", "budget_2024": 113924, "total_cost": 307933, "progress_rate": 37.0, "category": "나. 수도사업"},
                {"name": "(6) 광역상수도 스마트관리", "budget_2024": 10307, "total_cost": 229897, "progress_rate": 4.48, "category": "나. 수도사업"},
                {"name": "(7) 탄소중립 프로그램(2차)", "budget_2024": 5320, "total_cost": 5320, "progress_rate": 100.0, "category": "나. 수도사업"},
                {"name": "(8) 활성탄 수급안정화", "budget_2024": 27003, "total_cost": 28116, "progress_rate": 96.04, "category": "나. 수도사업"},
                {"name": "(12) 지방상수도(시설개선)", "budget_2024": 65097, "total_cost": 1399904, "progress_rate": 4.65, "category": "나. 수도사업"},
                {"name": "(13) 지방상수도(현대화)", "budget_2024": 493464, "total_cost": 2558346, "progress_rate": 19.29, "category": "나. 수도사업"},
                {"name": "(14) 하수도(건설)", "budget_2024": 2423, "total_cost": 12484, "progress_rate": 19.42, "category": "나. 수도사업"},
                {"name": "(1) 신도시", "budget_2024": 543918, "total_cost": 14686024, "progress_rate": 3.7, "category": "다. 수변사업"},
                {"name": "ㅇ 시화멀티테크", "budget_2024": 98549, "total_cost": 3605079, "progress_rate": 2.73, "category": "다. 수변사업"},
                {"name": "ㅇ 송산그린시티", "budget_2024": 445369, "total_cost": 11080945, "progress_rate": 4.02, "category": "다. 수변사업"},
                {"name": "ㅇ 구미확장단지", "budget_2024": 3754, "total_cost": 820764, "progress_rate": 0.46, "category": "다. 수변사업"},
                {"name": "ㅇ 구미하이테크", "budget_2024": 56705, "total_cost": 1932664, "progress_rate": 2.93, "category": "다. 수변사업"},
                {"name": "ㅇ 에코델타시티", "budget_2024": 395197, "total_cost": 6605070, "progress_rate": 5.98, "category": "다. 수변사업"},
                {"name": "ㅇ 나주 노안지구", "budget_2024": 325, "total_cost": 30618, "progress_rate": 1.06, "category": "다. 수변사업"},
                {"name": "ㅇ 부여 규암지구", "budget_2024": 3783, "total_cost": 28035, "progress_rate": 13.5, "category": "다. 수변사업"},
                {"name": "(4) 강원 물산업단지", "budget_2024": 63069, "total_cost": 387197, "progress_rate": 16.29, "category": "다. 수변사업"},
                {"name": "(5) 김포 친환경 스마트재생", "budget_2024": 258, "total_cost": 5752007, "progress_rate": 0.0, "category": "다. 수변사업"}
            ],
            "subcategories": {
                "가. 수자원사업": [
                    {"name": "(1) 기존댐 기능개선", "budget": 69347},
                    {"name": "(2) 하천관리 후속조치", "budget": 866},
                    {"name": "(3) 수자원정책 및 홍수관리", "budget": 59947},
                    {"name": "(4) 댐 운영 및 관리", "budget": 148948},
                    {"name": "(5) 수질 및 수생태계 관리", "budget": 23122},
                    {"name": "(6) 기타 대행사업", "budget": 27829}
                ],
                "나. 수도사업": [
                    {"name": "(1) 광역상수도건설(안정화)", "budget": 238689},
                    {"name": "(2) 광역상수도건설(확충)", "budget": 138248},
                    {"name": "(3) 공업용수도건설(안정화)", "budget": 59616},
                    {"name": "(4) 공업용수도건설(확충)", "budget": 7022},
                    {"name": "(5) 대산임해 해수담수화", "budget": 113924},
                    {"name": "(6) 광역상수도 스마트관리", "budget": 10307},
                    {"name": "(7) 탄소중립 프로그램(2차)", "budget": 5320},
                    {"name": "(8) 활성탄 수급안정화", "budget": 27003},
                    {"name": "(9) 기존수도시설 기능개선", "budget": 320000},
                    {"name": "(12) 지방상수도(시설개선)", "budget": 65097},
                    {"name": "(13) 지방상수도(현대화)", "budget": 493464},
                    {"name": "(14) 하수도(건설)", "budget": 2423}
                ],
                "다. 수변사업": [
                    {"name": "(1) 신도시", "budget": 543918},
                    {"name": "(2) 산업단지", "budget": 60459},
                    {"name": "(3) 친수사업", "budget": 399305},
                    {"name": "(4) 강원 물산업단지", "budget": 63069},
                    {"name": "(5) 김포 친환경 스마트재생", "budget": 258}
                ],
                "라.재생에너지": [
                    {"name": "(1) 태양광 발전사업", "budget": 8556},
                    {"name": "(2) 풍력 발전사업", "budget": 5333},
                    {"name": "(3) 수력 발전사업", "budget": 3222}
                ],
                "마.해외사업": [
                    {"name": "(1) 해외 수자원 개발", "budget": 12081},
                    {"name": "(2) 기술 수출 사업", "budget": 5527},
                    {"name": "(3) ODA 프로젝트", "budget": 2528}
                ]
            },
            "summary": {
                "total_budget": 2915428,
                "total_projects": 68,
                "avg_project_budget": 66819,
                "major_categories_count": 5
            }
        };
    }

    formatCurrency(amount) {
        if (amount >= 100000) {
            return (amount / 10000).toLocaleString('ko-KR', {
                maximumFractionDigits: 1
            }) + '억원';
        } else if (amount >= 10000) {
            return (amount / 10000).toLocaleString('ko-KR', {
                maximumFractionDigits: 2
            }) + '억원';
        } else {
            return amount.toLocaleString('ko-KR') + '만원';
        }
    }

    updateSummaryCards() {
        const summary = this.data.summary;
        
        document.getElementById('total-budget').textContent = this.formatCurrency(summary.total_budget);
        document.getElementById('total-projects').textContent = summary.total_projects + '개';
        document.getElementById('summary-budget').textContent = this.formatCurrency(summary.total_budget);
        document.getElementById('summary-categories').textContent = summary.major_categories_count + '개';
        document.getElementById('summary-projects').textContent = summary.total_projects + '개';
        document.getElementById('summary-avg').textContent = this.formatCurrency(summary.avg_project_budget);
    }

    initializeCharts() {
        this.createCategoryChart();
        this.createTopProjectsChart();
        this.createBudgetAnalysisChart();
        this.createTimelineChart();
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const data = this.data.major_categories;
        
        this.charts.category = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(item => item.category),
                datasets: [{
                    data: data.map(item => item.budget),
                    backgroundColor: this.pastelColors.chartPalette.slice(0, data.length),
                    borderColor: '#FFFFFF',
                    borderWidth: 3,
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                family: 'Noto Sans KR',
                                size: 12
                            },
                            color: '#4A4A5C'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#4A4A5C',
                        bodyColor: '#6B6B7D',
                        borderColor: '#C1E7D0',
                        borderWidth: 2,
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => {
                                const label = context.label;
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${this.formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    createTopProjectsChart() {
        const ctx = document.getElementById('topProjectsChart').getContext('2d');
        const data = this.data.top_projects.slice(0, 15);
        
        const categoryColors = {
            '가. 수자원사업': this.pastelColors.primary,
            '나. 수도사업': this.pastelColors.secondary,
            '다. 수변사업': this.pastelColors.purple,
            '라.재생에너지': this.pastelColors.yellow,
            '마.해외사업': this.pastelColors.orange
        };
        
        this.charts.topProjects = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name),
                datasets: [{
                    label: '예산 (만원)',
                    data: data.map(item => item.budget),
                    backgroundColor: data.map(item => categoryColors[item.category] || this.pastelColors.pink),
                    borderColor: data.map(item => categoryColors[item.category] || this.pastelColors.pink),
                    borderWidth: 2,
                    hoverBackgroundColor: data.map(item => {
                        const color = categoryColors[item.category] || this.pastelColors.pink;
                        return color + 'CC'; // Add transparency for hover
                    })
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#4A4A5C',
                        bodyColor: '#6B6B7D',
                        borderColor: '#C1E7D0',
                        borderWidth: 2,
                        cornerRadius: 8,
                        callbacks: {
                            title: (context) => {
                                return data[context[0].dataIndex].full_name;
                            },
                            label: (context) => {
                                return `예산: ${this.formatCurrency(context.parsed.x)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(193, 231, 208, 0.3)'
                        },
                        ticks: {
                            color: '#6B6B7D',
                            callback: (value) => this.formatCurrency(value)
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 10
                            },
                            color: '#6B6B7D'
                        }
                    }
                }
            }
        });
    }

    createBudgetAnalysisChart() {
        const ctx = document.getElementById('budgetAnalysisChart').getContext('2d');
        const data = this.data.budget_analysis;
        
        const categoryColors = {
            '가. 수자원사업': this.pastelColors.primary,
            '나. 수도사업': this.pastelColors.secondary,
            '다. 수변사업': this.pastelColors.purple
        };
        
        const datasets = [];
        const categories = [...new Set(data.map(item => item.category))];
        
        categories.forEach(category => {
            const categoryData = data.filter(item => item.category === category);
            datasets.push({
                label: category,
                data: categoryData.map(item => ({
                    x: item.budget_2024,
                    y: item.total_cost,
                    name: item.name,
                    progress: item.progress_rate
                })),
                backgroundColor: categoryColors[category] || this.pastelColors.pink,
                borderColor: '#FFFFFF',
                pointRadius: 8,
                pointHoverRadius: 10,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 3
            });
        });
        
        this.charts.budgetAnalysis = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: 'Noto Sans KR'
                            },
                            color: '#4A4A5C'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#4A4A5C',
                        bodyColor: '#6B6B7D',
                        borderColor: '#C1E7D0',
                        borderWidth: 2,
                        cornerRadius: 8,
                        callbacks: {
                            title: (context) => {
                                return context[0].raw.name;
                            },
                            label: (context) => {
                                const point = context.raw;
                                return [
                                    `2024년 예산: ${this.formatCurrency(point.x)}`,
                                    `총 사업비: ${this.formatCurrency(point.y)}`,
                                    `진행률: ${point.progress.toFixed(1)}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '2024년 예산 (만원)',
                            font: {
                                family: 'Noto Sans KR'
                            },
                            color: '#4A4A5C'
                        },
                        grid: {
                            color: 'rgba(193, 231, 208, 0.3)'
                        },
                        ticks: {
                            color: '#6B6B7D',
                            callback: (value) => this.formatCurrency(value)
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '총 사업비 (만원)',
                            font: {
                                family: 'Noto Sans KR'
                            },
                            color: '#4A4A5C'
                        },
                        grid: {
                            color: 'rgba(193, 231, 208, 0.3)'
                        },
                        ticks: {
                            color: '#6B6B7D',
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    createTimelineChart() {
        const ctx = document.getElementById('timelineChart').getContext('2d');
        const data = this.data.budget_analysis;
        
        const progressRanges = [
            { label: '0-10%', min: 0, max: 10 },
            { label: '11-25%', min: 11, max: 25 },
            { label: '26-50%', min: 26, max: 50 },
            { label: '51-75%', min: 51, max: 75 },
            { label: '76-100%', min: 76, max: 100 }
        ];
        
        const progressCounts = progressRanges.map(range => {
            return data.filter(item => 
                item.progress_rate >= range.min && item.progress_rate <= range.max
            ).length;
        });
        
        this.charts.timeline = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: progressRanges.map(range => range.label),
                datasets: [{
                    label: '프로젝트 수',
                    data: progressCounts,
                    backgroundColor: this.pastelColors.chartPalette.slice(0, 5),
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    hoverBackgroundColor: this.pastelColors.chartPalette.slice(0, 5).map(color => color + 'CC')
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#4A4A5C',
                        bodyColor: '#6B6B7D',
                        borderColor: '#C1E7D0',
                        borderWidth: 2,
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => {
                                const range = progressRanges[context.dataIndex];
                                const count = context.parsed.y;
                                const total = progressCounts.reduce((a, b) => a + b, 0);
                                const percentage = ((count / total) * 100).toFixed(1);
                                return `${range.label}: ${count}개 프로젝트 (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '진행률 범위',
                            font: {
                                family: 'Noto Sans KR'
                            },
                            color: '#4A4A5C'
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6B6B7D'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '프로젝트 수',
                            font: {
                                family: 'Noto Sans KR'
                            },
                            color: '#4A4A5C'
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(193, 231, 208, 0.3)'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#6B6B7D'
                        }
                    }
                }
            }
        });
    }

    initializeTabs() {
        const tabsNav = document.getElementById('category-tabs');
        const tabsContent = document.getElementById('category-content');
        
        // Clear existing content
        tabsNav.innerHTML = '';
        tabsContent.innerHTML = '';
        
        const categories = Object.keys(this.data.subcategories);
        
        // Create tab buttons
        categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = `tab-button ${index === 0 ? 'active' : ''}`;
            button.textContent = category;
            button.dataset.tabIndex = index;
            button.addEventListener('click', () => this.switchTab(index));
            tabsNav.appendChild(button);
        });
        
        // Create tab content panels
        categories.forEach((category, index) => {
            const panel = document.createElement('div');
            panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
            panel.id = `tab-${index}`;
            
            const subcategories = this.data.subcategories[category];
            if (subcategories && subcategories.length > 0) {
                subcategories.forEach(sub => {
                    const item = document.createElement('div');
                    item.className = 'subcategory-item';
                    item.innerHTML = `
                        <span class="subcategory-name">${sub.name}</span>
                        <span class="subcategory-budget">${this.formatCurrency(sub.budget)}</span>
                    `;
                    panel.appendChild(item);
                });
            } else {
                panel.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📊</div><p>해당 분야의 세부 프로젝트 데이터가 없습니다.</p></div>';
            }
            
            tabsContent.appendChild(panel);
        });
    }

    switchTab(tabIndex) {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach((btn) => {
            btn.classList.remove('active');
        });
        
        // Remove active class from all panels
        document.querySelectorAll('.tab-panel').forEach((panel) => {
            panel.classList.remove('active');
        });
        
        // Add active class to selected button and panel
        const activeButton = document.querySelector(`[data-tab-index="${tabIndex}"]`);
        const activePanel = document.getElementById(`tab-${tabIndex}`);
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        if (activePanel) {
            activePanel.classList.add('active');
        }
        
        this.currentTab = tabIndex;
    }

    initializeTable() {
        this.tableData = this.data.budget_analysis.map(item => ({
            name: item.name,
            category: item.category,
            budget_2024: item.budget_2024,
            total_cost: item.total_cost,
            progress_rate: item.progress_rate
        }));
        
        this.filteredData = [...this.tableData];
        this.populateTable();
        this.populateCategoryFilter();
    }

    populateTable() {
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';
        
        this.filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${this.formatCurrency(item.budget_2024)}</td>
                <td>${this.formatCurrency(item.total_cost)}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(item.progress_rate, 100)}%"></div>
                    </div>
                    <div class="progress-text">${item.progress_rate.toFixed(1)}%</div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    populateCategoryFilter() {
        const select = document.getElementById('category-filter');
        const categories = [...new Set(this.tableData.map(item => item.category))];
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.filterTable(e.target.value, document.getElementById('category-filter').value);
        });
        
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', (e) => {
            this.filterTable(document.getElementById('search-input').value, e.target.value);
        });
        
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
    }

    filterTable(searchTerm, categoryFilter) {
        this.filteredData = this.tableData.filter(item => {
            const matchesSearch = !searchTerm || 
                item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !categoryFilter || 
                item.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.populateTable();
    }

    addFadeInAnimation() {
        const elements = document.querySelectorAll('.summary-card, .chart-container-wrapper, .tabs-container, .table-wrapper');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 100);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WaterResourcesDashboard();
});