<style scoped>

</style>
<template>
    <div :id="pid">
        <slot name="content"></slot>
    </div>
</template>

<script>
import plupload from '../../../static/js/plupload.full.min.js'
export default {
    data () {
        return {
            uploader:null,
            fileUrl: -1,
            bucket: ''
        }
    },
    props: {
        // postinit: {
        //     type: Function,
        //     default : function (){
        //     }
        // },
        // uploadprogerss:{
        //     type:Function,
        //     default : function (up,file){
        //     },
        // },
        // error:{
        //     type:Function,
        //     default : function (up,err){
        //     if (err.code == -600) {
        //         //("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"))
        //     }
        //     else if (err.code == -601) {
        //         //("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型")
        //     }
        //     else if (err.code == -602) {
        //         //("\n这个文件已经上传过一遍了")
        //     }
        //     else 
        //     {
        //         //(document.createTextNode("\nError xml:" + err.response)
        //     }
        //     }
        // },
        // // beforeupload:{
        // //     type:Function,
        // //     default : function (up,file){
                
        // //     }
        // // },
        // fileuploaded:{
        //     type:Function,
        //     default : function (up,file,info){
        //         if (info.status == 200)
        //         {
        //             //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
        //         }
        //         else
        //         {
        //             //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
        //         } 
        //     }
        // },
        pid:{
            type:String,
            default: 'pickbtn'
        },
        maxfilesize:{
            type: String,
            default: '5mb'
        },
        mimetypes:{
            type: Array,
            default: ()=>{
                return [
                    {title : "Pic files", extensions : "jpg,png,jpeg"},
                ]
            }
        }
    },
    methods:{
        set_upload_param(up,filename){
            const that = this
            this.$request.get('/video/v1/file/policy',{
                fileName: filename,
            }).then(
                (response)=>{
                    if (response && (response.data.errorCode === 200)) {
                        let data =response.data.data
                        that.fileUrl = data.fileUrl
                        up.setOption({
                            url: "https://"+data.bucket + ".oss-cn-beijing.aliyuncs.com",
                            'multipart_params': 
                            {
                            'key' : data.objectKey,
                            'policy': data.policy,
                            'OSSAccessKeyId': data.accessId, 
                            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                            'signature': data.signature,
                            }
                        });
                        up.start();
                    }else{
                        this.$emit('uploadfail',{code:500,message:'pixel-ai服务不可用'})
                    }
                }
            )
        }
    },
    mounted () {
        const that = this
         //plupload init---------------------------
        this.uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : that.pid, 
            
            url : that.bucket,
            
            filters : {
                max_file_size : that.maxfilesize,
                mime_types: that.mimetypes,
            },
            
        
            init: {
                PostInit: function () {
                },
                FilesAdded: function (up,files) {
                    that.fileUrl = -1
                    that.set_upload_param(up,files[0].name)
                },
                BeforeUpload: function (up,file) {
                    that.$emit('beforeupload')
                },
                UploadProgress: function (up,file) {
                    that.$emit('progressing')
                },
                FileUploaded: function (up , file , info){
                    if(that.fileUrl !== -1&&that.fileUrl !== null){
                        console.log(file.id);
                        
                    that.$emit('uploadsuccess',{
                        id: file.id,
                        name: file.name,
                        url: that.fileUrl
                    })
                    }else{
                    that.$emit('uploadfail',{code:501,message:'没有id'})
                    }
                },
                Error: function (up,err) {
                    that.$emit('uploadfail',err)
                },
            }
        });
        
        this.uploader.init();
    }
}
</script>
