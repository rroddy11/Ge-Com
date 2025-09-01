import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock du TranslateService
    const translateServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of('mocked translation')),
      instant: jasmine
        .createSpy('instant')
        .and.returnValue('mocked translation'),
      use: jasmine.createSpy('use').and.returnValue(of({})),
      setDefaultLang: jasmine.createSpy('setDefaultLang'),
      getBrowserLang: jasmine.createSpy('getBrowserLang').and.returnValue('en'),
      onLangChange: of({ lang: 'en', translations: {} }),
      onTranslationChange: of({ lang: 'en', translations: {} }),
      onDefaultLangChange: of({ lang: 'en', translations: {} }),
      currentLang: 'en',
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent], // ✅ standalone → importer, pas déclarer
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
