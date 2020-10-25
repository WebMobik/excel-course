import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel'
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {rootReducer} from '@/redux/rootReducer';
import {createStore} from '@core/createStore';
import {debounce, storage} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(store => {
      storage(storageName(params), store)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({components: [
      Header, Toolbar, Formula, Table
    ], store});

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
