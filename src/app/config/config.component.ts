import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  error: any;
  headers: string[];
  config: Config;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  showConfig(){
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data },  // success path
        error => this.error = error    // error path
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // response is of type `HttpResponse<Config>`
      .subscribe(response => {
          // display its headers
          const keys = response.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${response.headers.get(key)}`);

          // access the body directly, which is typed as `Config`.
          this.config = { ... response.body };
      });
  }
}
