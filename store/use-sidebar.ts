import {create} from 'zustand';
interface SidebatrStore {
    collapsed:boolean;
    onExpand:()=>void;
    onCollapse:()=>void;

};

export const useSidebar = create<SidebatrStore>((set) => ({
    collapsed:false,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapse: ()=>set(()=>({collapsed:true})),
}));