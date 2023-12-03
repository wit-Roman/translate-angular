import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Welcome } from './welcome.component';

describe('Welcome', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [Welcome]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Welcome);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'logroconapp'`, () => {
    const fixture = TestBed.createComponent(Welcome);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('logroconapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Welcome);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('logroconapp app is running!');
  });
});
