import cloudinary,{ UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export function uploadPhoto(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    validate?: boolean
):Promise<UploadApiErrorResponse | UploadApiResponse | undefined>{
   return new Promise((resolve,reject)=>{
    cloudinary.v2.uploader.upload(
        file,{
            public_id,
            overwrite,
            validate,
            resource_type: 'auto'
        }
    ),
     (error:UploadApiErrorResponse|undefined, result: UploadApiResponse|undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve(result);
      }
   }
)         
}

export function uploadVideo(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    validate?: boolean
):Promise<UploadApiErrorResponse | UploadApiResponse | undefined>{
   return new Promise((resolve,reject)=>{
    cloudinary.v2.uploader.upload(
        file,{
            public_id,
            overwrite,
            validate,
            chunk_size: 50000,
            resource_type: 'video'
        }
    ),
     (error:UploadApiErrorResponse|undefined, result: UploadApiResponse|undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve(result);
      }
   }
)         
}