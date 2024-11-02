import colors from 'css-color-function'
const lightConfig = {
    'dark-2': 'shade(20%)',
    'light-3': 'tint(30%)',
    'light-5': 'tint(50%)',
    'light-7': 'tint(70%)',
    'light-9': 'tint(90%)'
}

const darkConfig = {
    'light-3': 'shade(20%)',
    'light-5': 'shade(30%)',
    'light-7': 'shade(50%)',
    'light-9': 'shade(70%)',
    'dark-2': 'tint(20%)'
}

/**
 * @author Jason
 * @description 用于生成主题的行为变量
 * 可选值有primary、success、warning、error、info
 */

export const generateVarsMap = (
    color: string,
    type = 'primary',
    isDark = false
) => {
    const colors = {
        [`--color-${type}`]: color
    }
    const config: Record<string, string> = isDark ? darkConfig : lightConfig
    for (const key in config) {
        colors[`--color-${type}-${key}`] = `color(${color} ${config[key]})`
    }
    return colors
}

/**
 * @author Jason
 * @description 生成主题
 */
export const generateVars = (
    options: Record<string, string>,
    extra: Record<string, string> = {},
    isDark = false
) => {
    const varsMap: Record<string, string> = Object.keys(options).reduce(
        (prev, key) => {
            return Object.assign(
                prev,
                generateVarsMap(options[key], key, isDark)
            )
        },
        extra
    )

    const vars = Object.keys(varsMap).reduce((prev, key) => {
        const color = colors.convert(varsMap[key])
        return `${prev}${key}:${color};`
    }, '')
    return vars
}
