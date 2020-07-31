import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSnackbarComponent } from './share-snackbar.component';

describe('ShareSnackbarComponent', () => {
  let component: ShareSnackbarComponent;
  let fixture: ComponentFixture<ShareSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
