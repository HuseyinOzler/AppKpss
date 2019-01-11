'use strict'
var request = require('request'); // İstek yapmak için kullanılacak paket.
var cheerio = require('cheerio'); // Getirilen veriyi parçalamak için kullanılacak paket.
var axios = require('axios');
var botModelKayit = use('App/Models/BotKayit');
var mongoose = require('lucid-mongo');

class BotilanGetirController {
    
    
           async bot({view,request}){

            let result = await axios.get('http://www.dpb.gov.tr/tr-tr');

              const gelen = result.headers["set-cookie"];
              console.log(gelen);


              var $ = cheerio.load(result.data);
              


                 let data = [];
            
                
             

                  $('#tab0').children(".tablist").children('.cf').each( async function (i, element) {
               
               // const ilanTarihi = ("ilan başligi = > " + $(element).find('p').text() + " ");
                    
                const ilanTarihi  =($(this).find('a.ilanTarihi').text() + " ");
                const ilanBasligi  =($(this).find('a.ilanBasligi').text() + " ");
                const ilanSonBasvuru  =($(this).find('a.sonBasvuru').text());
                const ilanlink = ($(this).find('a.ilanTarihi').attr("href"));
                

                const ilant = ilanTarihi[0] + ilanTarihi[1];
                const ilanf = ilanSonBasvuru[0] + ilanSonBasvuru[1];
                
                const islem = Math.abs(ilanf - ilant);

              
             

                  data.push({
                    ilanTarihi:ilanTarihi,
                    ilanBasligi: ilanBasligi,
                    ilanSonBasvuru: ilanSonBasvuru,
                    kalangün: islem,
                    ilanlink: ilanlink,
                   
                    
                    
                
                  });

                   await botModelKayit.query().insert({
                     ilanTarihi: ilanTarihi,
                     ilanBasligi: ilanBasligi,
                     ilanSonBasvuru: ilanSonBasvuru,
                     kalangün: islem,
                     ilanlink: ilanlink

                   });
                  
                 

                   
                  });
               
                 return view.render('welcome',{data:data});

            }




            async toplamKayit({view,response}){
              var countQuery = await botModelKayit.count();
              let veri = [];
              veri.push({
                countQuery: countQuery,
                sz :'İlan Mevcut'

              });
              return view.render('welcome',{veri:veri});
            }



            async tablosil({view,response}){
              
             const sil = await botModelKayit.query().delete('bot_kayits');
              let silme = [];
            silme.push({
              sil:'Tablo Verileri Silindi'
            });
            console.log(silme,'silem başarılı');
               return view.render('welcome',{silme:silme});
            }


           async ilanlar({view,response}){
              let data = await botModelKayit.all()
                 return  response.json({data})
           }



         

      }


module.exports = BotilanGetirController
