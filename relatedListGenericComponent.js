import { LightningElement, api , wire , track } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from 'lightning/navigation';
import { fetchContactColumn,dataTableHeaderContactColumn , fetchOpportunityColumn, dataTableHeaderOpportunityColumn } from './constantUtil'

const col = [{ label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Phone', fieldName: 'Phone' }]
const oppCol = [{ label: 'Id', fieldName: 'Id' }, { label: 'Name', fieldName: 'Name' }, { label: 'Type', fieldName: 'Type' }]

export default class GenericRelatedListComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    @api relatedListObjectNamePlural;
    @api relatedListObjectNameSingular;
    @track showDataTable = false;
    @track records;
    error;
    @track tempArr = null;
    @track columns = col;
    @track recordDataVar = [];
    @track relatedListFields = [] ; 
    @api relaxKar ; 

    //data = [{"Id":"0032w000012cMp7AAE","Phone":null,"Name":"Paneer Angara"},{"Id":"0032w000012cMuyAAE","Phone":null,"Name":"Chicken Biryani"},{"Id":"0032w000012cMoxAAE","Phone":null,"Name":"White SaucePasta"},{"Id":"0032w000012cMfaAAE","Phone":null,"Name":"Ice Tea"}];

    connectedCallback(){
        console.log('SunoBhai ::' + this.relaxKar);
        console.log('Record Id ::', this.recordId); 
        console.log('RelatedListObjectName' + this.relatedListObjectNamePlural);
        console.log('RelatedListObjectNameSingular' + this.relatedListObjectNameSingular)
        // const sojao = shreeRam ; 
        // console.log('SoGaya ::' + typeof(sojao) + ' ' + sojao + ' ' + sojao.length );
        // for ( let i = 0 ; i<sojao.length ; i++ ){
        //     console.log('lunch pe hu ' +  sojao[i]);
        // }
        // for ( t of sojao ){
        //     console.log(' pos ' + t ) ; 
        // }
        this.constructRelatedListFields();
    }

    
    constructRelatedListFields(){
        let tempArr = [] ; 
        const relatedListVar = this.relatedListObjectNameSingular;

        if ( this.relatedListObjectNameSingular === 'Contact'){
            tempArr = fetchContactColumn; 
            this.columns = dataTableHeaderContactColumn;
        }

        else if ( this.relatedListObjectNameSingular === 'Opportunity'){
            tempArr = fetchOpportunityColumn;
            this.columns = dataTableHeaderOpportunityColumn;
        }

        else if ( this.relatedListObjectNameSingular === 'Case' ){
            //write the logic for cases
        }

        console.log('Nahi peta mai Bhai ::' + tempArr + ' :) ' + this.columns  + ' A# ' +tempArr.length + typeof(tempArr)) ; 
        console.log('oee' + tempArr[0]);
        console.log('oee2' + tempArr[1]);
        console.log('heeh' + tempArr);
        // for( val of tempArr ){
        //     console.log('Accha hu bhai');
        // }
        for ( let i = 0 ; i<tempArr.length ; i++ ){
            console.log('Himanshi');
            this.relatedListFields.push( relatedListVar + '.' + tempArr[i])
        }
        console.log('AdityaBhai :) ' + this.relatedListFields);


        // if( this.relatedListObjectNameSingular === 'Contact'){
        //     this.columns = col ; 
        //     const tempArr = [ 'Id' , 'Name' , 'Phone'];
        //     for( let i = 0 ; i<3 ; i++ ){
        //         this.relatedListFields.push( relatedListVar + '.' + tempArr[i]);
        //     }
        //     console.log('AdityaBhai :) ' + this.relatedListFields);
        // }

        // else if ( this.relatedListObjectNameSingular === 'Opportunity'){
        //     this.columns = oppCol;
        //     const tempArr = ['Id' , 'Name' , 'Type'];
        //     for ( let i = 0 ; i<3 ; i++ ){
        //         this.relatedListFields.push( relatedListVar + '.' + tempArr[i]);
        //     }
        //     console.log('AAgayaBhai :: ' + this.relatedListFields);
        // }
    }


    @wire(getRelatedListRecords , {
        parentRecordId : '$recordId' ,
        relatedListId : '$relatedListObjectNamePlural',
        fields: '$relatedListFields' 
    })
    listInfo({error,data}){
        if( data ){
            this.recordDataVar = [] ; 
            this.records = data.records ; 
            this.showDataTable = true ; 
            console.log('Records Value ::' + JSON.stringify(this.records));
            //console.log('Value AA ja :: ' + JSON.stringify(this.records.fields.Id.value))

            for(const rec of this.records) {
                const tempObj = {}; 
                tempObj.Id = rec.fields.Id.value; 
                //tempObj.Phone = rec.fields.Phone.value; 
                tempObj.Name = rec.fields.Name.value; 

                console.log('Shalabh Bhai k name par'+ rec.fields.Name.value)
                //console.log('Shalabh Bhai k name par'+ rec.fields.Phone.value)
                console.log('Shalabh Bhai k name par'+ rec.fields.Id.value)
                this.recordDataVar.push(tempObj);
            }

            console.log('Dard hai bhai :: ' + JSON.stringify(this.recordDataVar));
        }
        else if ( error ){
            this.error = error ; 
            console.log('Error :: ' + JSON.stringify(this.error) ) ; 
        }
    }

    newRecordCreation(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.relatedListObjectNameSingular,
                actionName: 'new'
            }
        });
    }


}