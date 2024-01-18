import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EventFoodPage } from './event-food.page';

describe('EventFoodPage', () => {
  let component: EventFoodPage;
  let fixture: ComponentFixture<EventFoodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
