
export const add =(chapter , chapterId)=>{
    return{
        type:'add',
        ele: chapter,
        chapterId : chapterId
    }
}

export const remove =(chapter , chapterId)=>{
    return{
        type:'remove',
        ele: chapter,
        chapterId : chapterId
    }
}
export const toggle =(chapter , chapterId)=>{
    return{
        type:'toggle',
        ele: chapter,
        chapterId : chapterId
    }
}

export const addLec =(lecture , chapterId , lectureIndex)=>{
    return{
        type:'add',
        ele: lecture ,
        index : lectureIndex,
        chapterId : chapterId
    }
}

export const removeLec =(lecture , chapterId , lectureIndex)=>{
    return{
        type:'remove',
        ele: lecture ,
        index : lectureIndex,
        chapterId : chapterId
    }
}