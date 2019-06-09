import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendproposalComponent } from './sendproposal.component';

describe('SendproposalComponent', () => {
  let component: SendproposalComponent;
  let fixture: ComponentFixture<SendproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
