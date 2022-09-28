export function useCopy() {
    const copy = (text: string) => {
        uni.setClipboardData({
            data: String(text)
        })
    }
    return {
        copy
    }
}
