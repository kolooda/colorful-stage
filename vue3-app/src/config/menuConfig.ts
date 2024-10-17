const menuList = [
  {
    title: '首页', // 菜单标题名称
    index: '/home', // 对应的 path
    icon: 'House', // 图标名称
    isPublic: true//公共的
  },
  {
    title: '用户管理',
    index: '/user',
    icon: 'User'
  },
  {
    title: '角色管理',
    index: '/role',
    icon: 'Mouse',
  },
  {
    title: '学员',
    index: '/students',
    icon: 'Files',
    children: [ // 子菜单列表
      {
        title: '学校管理',
        index: '/school',
        icon: 'Cpu'
      },
      {
        title: '专业管理',
        index: '/majors',
        icon: 'Goods'
      },
      {
        title: '班级管理',
        index: '/class',
        icon: 'Pointer'
      },
      {
        title: '学生管理',
        index: '/student',
        icon: 'UserFilled'
      },

    ]
  },
]
export default menuList
