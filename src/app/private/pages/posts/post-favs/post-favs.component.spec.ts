import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFavsComponent } from './post-favs.component';

describe('PostFavsComponent', () => {
  let component: PostFavsComponent;
  let fixture: ComponentFixture<PostFavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFavsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
