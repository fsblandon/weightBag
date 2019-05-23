import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { By } from '@angular/platform-browser';
import { IndexServiceService } from './components/index/index-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Participante } from './models/participante';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        IndexComponent
      ],
      providers: [
        IndexServiceService
      ],
      imports: [
        HttpClientTestingModule,
        HttpTestingController
      ]
    }).compileComponents();
  }));
  describe('Index Service', () => {
    let indexService: IndexServiceService;
    const participante: Participante = new Participante();
    const fileInput: FormData = new FormData();
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [indexService]
      });
    });
    it('Should be created', () => {
      indexService = TestBed.get(indexService);
      expect(indexService).toBeTruthy();
    });
    it('Should have getdata', () => {
      indexService = TestBed.get(indexService);
      expect(indexService.postData(participante, fileInput)).toBeTruthy();
    });
  });
  it('Form should be Invalid', async(() => {
    const fixture = TestBed.createComponent(IndexComponent);
    const index = fixture.debugElement.componentInstance;
    index.dataForm.controls['cedula'].setValue(null);
    index.dataForm.controls['file'].setValue('');
    expect(index.dataForm.valid).toBeFalsy();
  }));
  it('Form should be Valid', async(() => {
    const fixture = TestBed.createComponent(IndexComponent);
    const index = fixture.debugElement.componentInstance;
    index.dataForm.controls['cedula'].setValue(123123);
    index.dataForm.controls['file'].setValue('c:/input');
    expect(index.dataForm.valid).toBeTruthy();
  }));
  it('Should call the addFile method', async(() => {
    const fixture = TestBed.createComponent(IndexComponent);
    const index = fixture.debugElement.componentInstance;
    spyOn(index, 'addFile');
    const m = fixture.debugElement.query(By.css('button')).nativeElement;
    m.click();
    expect(index.addFile).toHaveBeenCalledTimes(0);
  }));
});
