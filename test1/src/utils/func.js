export function debounce(fn) {
    let timer
    return function () {
        if (timer) clearTimeout(timer)
        let context = this
        let args = arguments
        timer = setTimeout(() => {
            fn.call(context, ...args)
        }, 300)
    }
}

export function isfilter(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] <= target && target <= arr[i][1]) {
            return true
        }
    }
    return false
}

export function isLegal(a,b,arr) {
    for(let i = 0; i < arr.length; i++) {
        if(a <= arr[i][0] && arr[i][1] <= b) {
            return false
        }
    }
    return true
} 