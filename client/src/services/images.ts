import { ImageData,PaginationResult } from '@/types';

export async function getImages (page:number = 1,pageSize:number = 10,keyword:string = ''){
    let result:PaginationResult<ImageData>;
    try{
      const params = new URLSearchParams({
         page: page.toString(),
         pageSize: pageSize.toString(),
         keyword: keyword
       });
        result = await fetch(`https://gallery-slide-a2yo.vercel.app/api/images?`+params)
         .then((res) => {
            if(res.ok && res.status === 200) return res.json()
         })
         .catch(error => console.error('Error:', error));
        

    }
    catch (err: unknown) {
       throw(err)
    }
    return result;
}