import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  constructor(private data: DataService) { }


  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       var file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            console.log(csv);
         }

         var formData: FormData = new FormData();
         formData.append('file',file,file.name);
         console.log('formdata ',formData);
         //post data to service
         this.data.upload(formData).subscribe(response=>{
           console.log('response ',response)
         });
         
    }
  }

  ngOnInit() {
  }

}
