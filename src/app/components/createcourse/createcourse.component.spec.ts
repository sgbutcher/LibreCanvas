import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreatecourseComponent } from './createcourse.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CreatecourseComponent', () => {
  let component: CreatecourseComponent;
  let fixture: ComponentFixture<CreatecourseComponent>;
  let title: HTMLElement;
  let CTitleInput: HTMLElement;
  let CdiscriptionInput: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ CreatecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    title = fixture.nativeElement.querySelector('h2');
    CTitleInput = fixture.debugElement.query(By.css('#ctitle-input')).nativeElement;
    CdiscriptionInput = fixture.debugElement.query(By.css('#cdesc-input')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title Create Course', () => {
    expect(title.textContent).toEqual('Create Course');
  });
  
  it('should have field for course title', () => {
    expect(CTitleInput).toBeTruthy();
  });

  it('should have field for course description', () => {
    expect(CdiscriptionInput).toBeTruthy();
  });


});
