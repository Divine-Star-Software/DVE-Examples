import type { ElementTreeData } from "libs/index.js";
import { ElementTree } from "../../libs/ElementTree/ElementTree.js";
import { VoxelList, VoxelListData } from "./VoxelList.js";

let currentvoxel = "dve:dreamstone";

let loadedVoxel = localStorage.getItem("voxel");

if (loadedVoxel) {
 currentvoxel = loadedVoxel;
}

const voxelCascade = {
 id: currentvoxel,
};
const [cascade] = ElementTree.cascade(voxelCascade);
const voxelNode = (data: VoxelListData): ElementTreeData => {
 let classAdd = "";
 if (currentvoxel == data.id) {
  classAdd = "active";
 }

 return [
  {
   type: "div",
   attrs: {
    className: `voxel-node ${classAdd}`,
   },
   children: [
    {
     type: "img",
     attrs: {
      img: {
       src: data.texturePath,
      },
     },
    },
    {
     type: "p",
     attrs: {
      className: "voxel-node-title",
     },
     text: data.name,
    },
   ],
   events: {
    onClick: (event: MouseEvent) => {
     event.preventDefault();
     event.stopPropagation();

     localStorage.setItem("voxel", data.id);
     voxelCascade.id = data.id;
     cascade();
    },
   },
   cascade: {
    origin: voxelCascade,
    receiver(elm: HTMLDivElement, cascadeProps) {
     if (cascadeProps.id == data.id) {
      elm.classList.add("active");
     } else {
      elm.classList.remove("active");
     }
    },
   },
  },
 ];
};

export const VoxelSelectScreen = (): ElementTreeData => {
 return [
  {
   type: "div",
   attrs: {
    className: "voxel-list",
   },
   children: VoxelList.map((data) => voxelNode(data)),
  },
 ];
};
