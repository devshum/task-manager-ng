import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { debounce, filter, tap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent implements OnInit {
  public load$: Observable<boolean>;

  constructor(
    private _loaderService: LoaderService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
     this.load$ = this._loaderService.loading$.pipe(
      filter(load => load !== null),
      debounce(load => load ? timer(0) : timer(500)),
      tap(() => this._cd.detectChanges())
    );
  }
}
