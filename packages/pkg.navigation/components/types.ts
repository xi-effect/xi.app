export interface IColumn {
    isStatic? : boolean,
    title : string,
    subtitle : string,
    id : string
  }
  
 export interface ICategory {
    elId : string,
    columnId : string,
    icon: string,
    type: string,
    label: string,
    link: string,
  }