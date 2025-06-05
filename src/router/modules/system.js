/**
 * @description 系统管理
 */

const route = [
  {
    path: '/system',
    meta: { title: '系统管理', i18nName: 'tadSysManagement', icon: 'IconCustomSystem' },
    name: 'System',
    redirect: '/system/user',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'user',
        meta: { title: '用户管理', i18nName: 'tadUserManage', icon: 'IconCustomUser' },
        name: 'SystemUser',
        component: () => import('@/views/system/user.vue')
      },
      {
        path: 'role',
        meta: { title: '角色管理', i18nName: 'tadRoleManage', icon: 'IconCustomPerson' },
        name: 'SystemRole',
        component: () => import('@/views/system/role.vue')
      }
    ]
  }
]

export default route
