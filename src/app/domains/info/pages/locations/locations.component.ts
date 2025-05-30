import { afterNextRender, Component, resource, signal } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
})
export default class LocationsComponent {

  $origin = signal<string | null>('');
  constructor() {
    afterNextRender(() => {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        this.$origin.set(origin);
      });
    });
  }

  locationsRs = resource({
    request: () => ({ origin: this.$origin() }),
    loader: async ({ request }) => {
      const url = new URL(`${environment.apiUrl}/api/v1/locations`);
      if (request.origin) {
        url.searchParams.append('origin', request.origin);
      }
      const response = await fetch(url);
      return response.json();
    },
  });
}
