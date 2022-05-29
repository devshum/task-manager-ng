import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { debounce, filter, takeUntil } from 'rxjs/operators';
import { timer, Subject } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent implements OnInit {
  @Input() load = true;
  private _unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private _loaderService: LoaderService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
     this._loaderService.loading$.pipe(
      takeUntil(this._unsubscribe$),
      filter(load => load !== null),
      debounce(load => load ? timer(0) : timer(500))
    ).subscribe((isLoad: boolean) => {
      this.load = isLoad;
      this._cd.detectChanges();
    });
  }
}
