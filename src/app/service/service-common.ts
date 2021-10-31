import { throwError as observableThrowError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { identifierModuleUrl } from "@angular/compiler";

/**
 * Common services
 */
@Injectable()
export class CommonService {
  /**
   * Constructor
   * @param _http
   */
  constructor(
    private _http: HttpClient
  ) { }
  /**
   * Generic get all in the database
   * @param url
   */
  getAll(url: string): Observable<any> {
    return this._http.get(`${environment.API_URL}${url}`, { withCredentials: true })

  }

  get_all(url: string, params: any = null): Observable<any> {

    // console.log(params);

   /*
   const headers = new HttpHeaders()
         .set('Access-Control-Allow-Origin', 'Content-Type').set('Content-Type', 'application/json')
         .set('Access-Control-Allow-Credentials', 'true');
   const headers = new HttpHeaders({'Content-Type': 'application/json'})
       .set('Access-Control-Allow-Origin', 'Content-Type')
       .set('Authorization', `Bearer ${localStorage.getItem('token')}`)*/

   return params != null  ? this._http.get(url) : this._http.get(url, { params: params, withCredentials: true});
 }

 get_all_with_auth(url: string, params: any = null): Observable<any> {

  // console.log(params);

 /*
 const headers = new HttpHeaders()
       .set('Access-Control-Allow-Origin', 'Content-Type').set('Content-Type', 'application/json')
       .set('Access-Control-Allow-Credentials', 'true');*/
 const headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`})

 return params != null  ? this._http.get(url, {headers: headers}) : this._http.get(url, {headers: headers, params: params});
}

  /**
   * Generic get by pagination in the database with parameters in url
   * @param url
   * @param sortDirection
   * @param sortActive
   * @param pageSize
   * @param pageIndex
   */
  getByPagination(url: string, sortDirection: boolean, sortActive: string, pageSize: number, pageIndex: number): Observable<any> {
    return this._http.get(`${environment.API_URL}${url}GetByPagination`, {
      params: {
      sortDirection: sortDirection.toString(),
      sortActive: sortActive.toString(),
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString()
      },withCredentials: true
    })
  }

  /**
   * Generic get by pagination in the database with parameters in json format
   * @param url
   * @param sortDirection
   * @param sortActive
   * @param pageSize
   * @param pageIndex
   * @param post
   */
  postByPagination(url: string,
    sortDirection: boolean,
    sortActive: string,
    pageSize: number,
    pageIndex: number,
    post: any = null): Observable<any> {

    var model = {
      sortDirection: sortDirection,
      sortActive: sortActive,
      pageSize: pageSize,
      pageIndex: pageIndex,
      post: post
    };
    /*
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("Content-Type", "application/json");
    */
    return this._http.post(`${environment.API_URL}${url}PostByPagination`, model, { withCredentials: true})

  }

  /**
   * get by id column in the database with parameters in the url
   * @param url
   * @param params
   */
  getById(url: string, id: number): Observable<any> {
    return this._http.get(`${environment.API_URL}${url}GetById` , {params : { id: id.toString() }, withCredentials: true })

  }

  /**
   * get one element in the database
   * @param url
   * @param params
   */
  get(url: string, params: any = null): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
       .set('Access-Control-Allow-Origin', 'Content-Type')
       .set('Content-Type', 'application/json');
    return params != null ? this._http.get(`${environment.API_URL}${url}`, { headers, params: params, withCredentials: true }) : this._http.get(`${environment.API_URL}`, { headers, withCredentials: true })

  }

  /**
   * get one element in the database with the response in text format and with parameters in the url
   * @param url
   * @param params
   */
   getForText(url: string, params: any = null): Observable<any> {
    return params != null ? this._http.get(`${environment.API_URL}${url}`, { params: params, withCredentials: true }) : this._http.get(`${environment.API_URL}`, { withCredentials: true , responseType: "text" })

  }

  /**
   * get one element in the database the response in blob format and with parameters in the url
   * @param url
   * @param params
   */
   getForBlob(url: string, params: any = null): Observable<any> {
    return params != null ? this._http.get(`${environment.API_URL}${url}`, { params: params, withCredentials: true }) : this._http.get(`${environment.API_URL}`, { withCredentials: true ,responseType: "blob" })

  }

  /**
   * Get element in the database with json parameters in the header
   * @param url
   * @param model
   */
  post(url: string, model: any = null, ): Observable<any> {
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("Content-Type", "application/json");

    // return params != null  ? this._http.get(url) : this._http.get(url, {headers: headers, params: params});

    return this._http.post(`${environment.API_URL}${url}`, model, { headers, withCredentials: true })
  }

  /**
   * Get element in the database with json parameters in the header
   * @param url
   * @param model
 x
   post(url: string, model: any = null): Observable<any> {
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("Content-Type", "application/json");

    return this._http.post(`${environment.API_URL}${url}`, model, { headers, withCredentials: true })

  } */

  /**
   * Get element in the database with json parameters in the header and with the response in text format
   */
   postForText(url: string, model: any): Observable<any> {
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("Content-Type", "application/json");

    return this._http.post(`${environment.API_URL}${url}`, model, { headers, withCredentials: true, responseType: "text" })

  }

  /**
   * Get element in the database with json parameters in the header  and with the response in blob format
   */
   postForBlob(url: string, model: any): Observable<any> {
    let headers = new HttpHeaders()
      .set("Access-Control-Allow-Headers", "Content-Type")
      .set("Content-Type", "application/json");

    return this._http.post(`${environment.API_URL}${url}`, model, { headers, withCredentials: true , responseType: "blob" })

  }

  /**
   * Update element in the database with json parameters in the header
   */
   put(url: string, model: any): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this._http.put(`${environment.API_URL}${url}`, model, { headers, withCredentials: true })

  }


  /**
   * Add element in the database with json parameters in the header
   */
   add(url: string, model: any): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this._http.post(`${environment.API_URL}${url}Add`, model, { headers, withCredentials: true })

  }


  /**
   * Update element in the database with json parameters in the header
   */
   update(url: string, model: any): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this._http.post(`${environment.API_URL}${url}Update`, model, { headers, withCredentials: true })

  }


  /**
   * Delete element in the database with json parameters in the header
   */
   delete(url: string, id: number): Observable<any> {
    let params = new HttpParams();
    params.set('id', id.toString());

    return this._http.delete(`${environment.API_URL}${url}Delete`, { params: { id: id.toString() }, withCredentials: true })

  }

  /**
   * Return global error
   */
  private handleError(error: HttpErrorResponse){
    console.error(error);
    return observableThrowError(error || 'Login error');
  }


}
