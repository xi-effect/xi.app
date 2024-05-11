export interface ICategory {
    title : string,
    subtitle : string,
    id : string
}
export interface IChannel {
    elId : string,
    categoryId : string,
    icon: string,
    type: string,
    label: string,
    link: string,
}
