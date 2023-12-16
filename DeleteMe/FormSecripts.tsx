import { Utils } from "../src/lib/utils";

export default class FormSecripts {
  constructor() {
    // this.form = document.querySelector('#form')
    // this.form.addEventListener('submit', this.handleSubmit)
  }

  static extractValues = (queries: IGroup[], includeNone = false) => {
    let defaultQP: IdefaultQP[] = [];
    queries?.map((group) => {
      _extract(group, defaultQP, includeNone);
    });
    return defaultQP;
  };
}

// const _extractValues = (queries: any[], defaultQP: any, includeNone?: boolean) => {
//   queries?.map((group) => {
//     _extract(group, defaultQP, includeNone);
//   });
//   return defaultQP;
// };

interface IdefaultQP {
  value: any;
  title: any;
  clear?: any;
  type?: any;
  id: any;
}

interface IGroup {
  children: IQuery[];
  className: string;
}

interface IQuery {
  id: any;
  type: string;
  value?: any;
  title?: any;
  className?: any;
  storageKey?: any;
  options?: any;
  showInClearBar?: any;
  onChange?: any;
  children?: IQuery[];
  containerClass?: string;
}

interface IOption {
  id: any;
  className: any;
}

const _extract = (group: IGroup, defaultQP: IdefaultQP[], includeNone?: boolean) => {
  group?.children.map((query) => {
    if (query.storageKey) {
      let storageValue = localStorage.getItem(query.storageKey) as any;
      if (storageValue) {
        if (query.type === "boolean") storageValue = storageValue === "true";
        query.value = storageValue;
      }
    }
    if (query.type === "selector") {
      query.className = query.options.find((o: IOption) => o.id == query.value)?.className || query.className;
    } else if (query.options) {
      let i = query.options.findIndex((o: IOption) => o.id == query.value);
      // if (i !== -1) query.options[i].className = "selected";
    } else if (query.children) {
      // if (query.type === "button") _extractValues(query.type === "button" ? [query] : query, defaultQP, includeNone);
    }
    // if (includeNone || Utils.hasValue(query.value)) defaultQP[query.id] = { value: query.value, title: query.title || "_" }; //, clear: query.showInClearBar && query.value !== false, type: query.type };
    if (includeNone || Utils.hasValue(query.value)) defaultQP.push({ id: query.id, value: query.value, title: query.title || "_" }); //, clear: query.showInClearBar && query.value !== false, type: query.type };
  });
};
