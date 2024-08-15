export enum MenuTypeEnum {
    'SHOP_PAGES' = 'shop',
    'APPTOOL' = 'application_tool',
    'OTHER_LINK' = 'other_link'
}

export enum LinkTypeEnum {
    'SHOP_PAGES' = 'shop',
    'ARTICLE_LIST' = 'article',
    'CUSTOM_LINK' = 'custom',
    'MINI_PROGRAM' = 'mini_program'
}

export interface Link {
    path: string
    name?: string
    type: string
    query?: Record<string, any>
}
