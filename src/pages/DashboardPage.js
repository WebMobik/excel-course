import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecordsTable} from './dashboard.function';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
        <div class="db__header">
            <h1>Excel. Admin Panel</h1>
        </div>
    
        <div class="db__new">
            <div class="db__view">
            <a href="#" class="db__create">
                Новая <br /> Таблица
            </a>
            </div>
        </div>
    
        <div class="db__table db__view">
    
            ${createRecordsTable()}
    
        </div>
    `)
  }
}
