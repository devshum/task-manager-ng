import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { debounce, filter } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  @Input() load = true;

  constructor(
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
     this._loaderService.loadingObserver$.pipe(
      filter(load => load !== null),
      debounce(load => load ? timer(0) : timer(500))
    ).subscribe((isLoad: boolean) => this.load = isLoad);
  }
}
