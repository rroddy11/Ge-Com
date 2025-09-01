import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock du TranslateService
    const translateServiceMock = {
      get: jest.fn().mockReturnValue(of('mocked translation')),
      instant: jest.fn().mockReturnValue('mocked translation'),
      use: jest.fn().mockReturnValue(of({})),
      setDefaultLang: jest.fn(),
      getBrowserLang: jest.fn().mockReturnValue('en'),
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
