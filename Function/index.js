
import React, { useState, useRef, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';

import Geolocation from '@react-native-community/geolocation';

import SQLite from 'react-native-sqlite-storage';
var db = SQLite.openDatabase({name : "SurveyPendudukDatabase.db", createFromLocation : 1}, this.okCallback,this.errorCallback);
okCallback = () =>{
  console.log('sukses');
}
errorCallback = () =>{
  console.log('gagal');
}
// var db = openDatabase({ name: 'SurveyPendudukDatabase.db' });

GLOBALDATA = require('../Function/global');

export const GetLokasi = () => {
    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            console.log(position);
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
            
            // Set global data current location atau bisa pakai useState
            GLOBALDATA.LONG = currentLongitude;
            GLOBALDATA.LAT = currentLatitude;
          },
          (error) => {
            //setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };
      
    // request get location 
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          subscribeLocationLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              subscribeLocationLocation();
            } else {
              console.log('Permission Current Location Denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
      return () => {
        Geolocation.clearWatch(watchID);
      };
      // end request get location
}

export const CreateTabel = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
      [],
      function (tx, res) {
        //if(res.rows.length == 0){
            //Mulai Generate Semua Tabel ke Database
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_agama (id_agama integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_agama PRIMARY KEY (id_agama));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_jenis_bantuan (id_jenis_bantuan integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_jenis_bantuan PRIMARY KEY (id_jenis_bantuan));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_jenis_goldar (id_jenis_goldar integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_jenis_goldar PRIMARY KEY (id_jenis_goldar));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_jenis_kelamin (id_jenis_kelamin integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_jenis_kelamin PRIMARY KEY (id_jenis_kelamin));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_jenis_pekerjaan (id_jenis_pekerjaan integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_jenis_pekerjaan PRIMARY KEY (id_jenis_pekerjaan));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_jenis_warga (id_warga integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_jenis_warga PRIMARY KEY (id_warga));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_kk (no_kk numeric(16, 0) NOT NULL, id_status_kk integer(10) NOT NULL, alamat varchar(255) NOT NULL, rt varchar(3) NOT NULL, rw varchar(3) NOT NULL, geom bigint(19), desa varchar(255), kecamatan varchar(255), kabupaten varchar(255), provinsi varchar(255), foto_kk varchar(255) NOT NULL, foto_rumah varchar(255) NOT NULL, foto_keluarga varchar(255) NOT NULL, created_by bigint(19) NOT NULL, created_date timestamp NOT NULL, updated_by bigint(19), updated_date timestamp, CONSTRAINT pk_kk PRIMARY KEY (no_kk), FOREIGN KEY(id_status_kk) REFERENCES tb_status_kk(id_status_kk), FOREIGN KEY(created_by) REFERENCES tb_user(id_user), FOREIGN KEY(updated_by) REFERENCES tb_user(id_user));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_kk_bantuan (id_kk_bantuan INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, no_kk numeric(16, 0) NOT NULL, id_jenis_bantuan integer(10) NOT NULL, created_by bigint(19) NOT NULL, created_date timestamp NOT NULL, updated_by bigint(19), updated_date timestamp, FOREIGN KEY(no_kk) REFERENCES tb_kk(no_kk), FOREIGN KEY(id_jenis_bantuan) REFERENCES tb_jenis_bantuan(id_jenis_bantuan), FOREIGN KEY(created_by) REFERENCES tb_user(id_user), FOREIGN KEY(updated_by) REFERENCES tb_user(id_user));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_kk_bantuan_terima (id_kk_bantuan_terima INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_kk_bantuan integer(10) NOT NULL, nik_penerima numeric(16, 0) NOT NULL, tanggal_terima date NOT NULL, foto_bukti_terima varchar(255) NOT NULL, foto_terima varchar(255) NOT NULL, created_by bigint(19) NOT NULL, created_date timestamp NOT NULL, updated_by bigint(19), updated_date timestamp, FOREIGN KEY(id_kk_bantuan) REFERENCES tb_kk_bantuan(id_kk_bantuan), FOREIGN KEY(nik_penerima) REFERENCES tb_nik(nik), FOREIGN KEY(created_by) REFERENCES tb_user(id_user), FOREIGN KEY(updated_by) REFERENCES tb_user(id_user));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_kk_nik (no_kk numeric(16, 0) NOT NULL, nik numeric(16, 0) NOT NULL UNIQUE, id_status_kk_nik integer(10) NOT NULL, PRIMARY KEY (no_kk, nik), FOREIGN KEY(no_kk) REFERENCES tb_kk(no_kk), FOREIGN KEY(nik) REFERENCES tb_nik(nik), FOREIGN KEY(id_status_kk_nik) REFERENCES tb_status_kk_nik(id_status_kk_nik));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_nik (nik numeric(16, 0) NOT NULL, id_status_kawin integer(10) NOT NULL, id_jenis_pekerjaan integer(10) NOT NULL, id_agama integer(10) NOT NULL, id_jenis_kelamin integer(10) NOT NULL, id_warga integer(10) NOT NULL, id_jenis_goldar integer(10) NOT NULL, tempat_lahir varchar(255) NOT NULL, tanggal_lahir date NOT NULL, nama_ayah varchar(255) NOT NULL, nama_ibu varchar(255) NOT NULL, no_kitas integer(10), no_paspor integer(10), created_by bigint(19) NOT NULL, created_date timestamp NOT NULL, updated_by bigint(19), updated_date timestamp, CONSTRAINT pk_nik PRIMARY KEY (nik), FOREIGN KEY(id_status_kawin) REFERENCES tb_status_kawin(id_status_kawin), FOREIGN KEY(id_jenis_pekerjaan) REFERENCES tb_jenis_pekerjaan(id_jenis_pekerjaan), FOREIGN KEY(id_agama) REFERENCES tb_agama(id_agama), FOREIGN KEY(id_jenis_kelamin) REFERENCES tb_jenis_kelamin(id_jenis_kelamin), FOREIGN KEY(id_warga) REFERENCES tb_jenis_warga(id_warga), FOREIGN KEY(id_jenis_goldar) REFERENCES tb_jenis_goldar(id_jenis_goldar), FOREIGN KEY(created_by) REFERENCES tb_user(id_user), FOREIGN KEY(updated_by) REFERENCES tb_user(id_user));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_status_kawin (id_status_kawin integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_status_kawin PRIMARY KEY (id_status_kawin));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_status_kk (id_status_kk integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_status_kk PRIMARY KEY (id_status_kk));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_status_kk_nik (id_status_kk_nik integer(10) NOT NULL, keterangan varchar(255) NOT NULL, CONSTRAINT pk_status_kk_nik PRIMARY KEY (id_status_kk_nik));');
          txn.executeSql('CREATE TABLE IF NOT EXISTS tb_user (id_user INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username varchar(36) NOT NULL, password varchar(64) NOT NULL, email varchar(64) NOT NULL, isactive integer(10) NOT NULL, CONSTRAINT tr_user_username_key UNIQUE (username), CONSTRAINT tr_user_email_key UNIQUE (email));');
          // END Generate Semua Tabel ke Database
        //}
        for (let i = 0; i < res.rows.length; ++i){
          console.log('TABLE EXISTS :', res.rows.item(i).name);
        }

      }
    );
  });
};

export const InisialisasiDataLocal = () => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
      [],
      function (tx, res) {
        
        // bersihkan semua data
        txn.executeSql('DELETE FROM tb_agama');
        // txn.executeSql('DELETE FROM tb_jenis_bantuan');
        // txn.executeSql('DELETE FROM tb_jenis_goldar');
        txn.executeSql('DELETE FROM tb_jenis_kelamin');
        txn.executeSql('DELETE FROM tb_jenis_pekerjaan');
        // txn.executeSql('DELETE FROM tb_jenis_warga');
        // txn.executeSql('DELETE FROM tb_status_kawin');
        // txn.executeSql('DELETE FROM tb_status_kk');
        // txn.executeSql('DELETE FROM tb_status_kk_nik');
        // txn.executeSql('DELETE FROM tb_user');
        
        const DataInsertAgama = [{"id":1,"nama":"Islam"},{"id":2,"nama":"Kristen Protestan"},{"id":3,"nama":"Katholik"},{"id":4,"nama":"Hindu"},{"id":5,"nama":"Buda"},{"id":6,"nama":"Khong Hu Cu"}];
        const DataInsertJenisKelamin = [{"id":1,"nama":"Laki-laki"},{"id":2,"nama":"Perempuan"}];

        // //const DataInsert_JenjangPendidikan = [{"id":0,"nama":"Lainnya"},{"id":1,"nama":"Sekolah Dasar"},{"id":2,"nama":"Sekolah Menengah Pertama"},{"id":3,"nama":"Sekolah Menengah Atas"},{"id":4,"nama":"Diploma I"},{"id":5,"nama":"Diploma II"},{"id":6,"nama":"Diploma III"},{"id":7,"nama":"Diploma IV"},{"id":8,"nama":"Strata I"},{"id":9,"nama":"Strata II"},{"id":10,"nama":"Strata III"}];
        
        for (let i = 0; i < DataInsertAgama.length; ++i){
          txn.executeSql(
            'INSERT INTO tb_agama (id_agama, keterangan) VALUES (?,?)',
            [DataInsertAgama[i].id, DataInsertAgama[i].nama],
            (tx, results) => {
              console.log('Status Insert Agama', DataInsertAgama[i].nama, results.rowsAffected);
            }
          );
        }

        for (let ijk = 0; ijk < DataInsertJenisKelamin.length; ++ijk){
          txn.executeSql(
            'INSERT INTO tb_jenis_kelamin (id_jenis_kelamin, keterangan) VALUES (?,?)',
            [DataInsertJenisKelamin[ijk].id, DataInsertJenisKelamin[ijk].nama],
            (tx, results) => {
              console.log('Status Insert Jenis Kelamin', DataInsertJenisKelamin[ijk].nama, results.rowsAffected);
            }
          );
        }

        /// start inisialisasi data combo jenis pekerjaan
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (0, 'Lainnya');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (1, 'Belum / Tidak Bekerja');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (2, 'Mengurus Rumah Tangga');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (3, 'Pelajar / Mahasiswa');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (4, 'Pensiunan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (5, 'Pegawai Negeri Sipil');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (6, 'Tentara Nasional Indonesia');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (7, 'Kepolisian RI');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (8, 'Perdagangan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (9, 'Petani / Pekebun');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (10, 'Peternak');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (11, 'Nelayan / Perikanan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (12, 'Industri');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (13, 'Konstruksi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (14, 'Transportasi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (15, 'Karyawan Swasta');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (16, 'Karyawan BUMN');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (17, 'Karyawan BUMD');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (18, 'Karyawan Honorer');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (19, 'Buruh Harian Lepas');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (20, 'Buruh Tani / Perkebunan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (21, 'Buruh Nelayan / Perikanan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (22, 'Buruh Peternakan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (23, 'Pembantu Rumah Tangga');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (24, 'Tukang Cukur');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (25, 'Tukang Listrik');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (26, 'Tukang Batu');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (27, 'Tukang Kayu');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (28, 'Tukang Sol Sepatu');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (29, 'Tukang Las / Pandai Besi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (30, 'Tukang Jahit');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (31, 'Penata Rambut');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (32, 'Penata Rias');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (33, 'Penata Busana');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (34, 'Mekanik');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (35, 'Tukang Gigi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (36, 'Seniman');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (37, 'Tabib');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (38, 'Paraji');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (39, 'Perancang Busana');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (40, 'Penterjemah');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (41, 'Imam Masjid');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (42, 'Pendeta');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (43, 'Pastur');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (44, 'Wartawan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (45, 'Ustadz / Mubaligh');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (46, 'Juru Masak');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (47, 'Promotor Acara');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (48, 'Anggota DPR-RI');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (49, 'Anggota DPD');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (50, 'Anggota BPK');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (51, 'Presiden');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (52, 'Wakil Presiden');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (53, 'Anggota Mahkamah Konstitusi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (54, 'Anggota Kabinet / Kementerian');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (55, 'Duta Besar');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (56, 'Gubernur');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (57, 'Wakil Gubernur');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (58, 'Bupati');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (59, 'Wakil Bupati');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (60, 'Walikota');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (61, 'Wakil Walikota');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (62, 'Anggota DPRD Propinsi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (63, 'Anggota DPRD Kabupaten / Kota');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (64, 'Dosen');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (65, 'Guru');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (66, 'Pilot');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (67, 'Pengacara');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (68, 'Notaris');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (69, 'Arsitek');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (70, 'Akuntan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (71, 'Konsultan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (72, 'Dokter');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (73, 'Bidan');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (74, 'Perawat');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (75, 'Apoteker');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (76, 'Psikiater / Psikolog');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (77, 'Penyiar Televisi');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (78, 'Penyiar Radio');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (79, 'Pelaut');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (80, 'Peneliti');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (81, 'Sopir');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (82, 'Pialang');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (83, 'Paranormal');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (84, 'Pedagang');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (85, 'Perangkat Desa');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (86, 'Kepala Desa');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (87, 'Biarawati');");
        txn.executeSql("INSERT INTO tb_jenis_pekerjaan (id_jenis_pekerjaan, keterangan) VALUES (88, 'Wiraswasta');");
        /// end inisialisasi data combo jenis pekerjaan

      }
    );
    
  });
}

export const DropTabel = () => {
  db.transaction(function (txn) {
    // bersihkan semua data
    txn.executeSql('DROP TABLE IF EXISTS tb_agama');
    txn.executeSql('DROP TABLE IF EXISTS tb_jenis_bantuan');
    txn.executeSql('DROP TABLE IF EXISTS tb_jenis_goldar');
    txn.executeSql('DROP TABLE IF EXISTS tb_jenis_kelamin');
    txn.executeSql('DROP TABLE IF EXISTS tb_jenis_pekerjaan');
    txn.executeSql('DROP TABLE IF EXISTS tb_jenis_warga');
    txn.executeSql('DROP TABLE IF EXISTS tb_kk');
    txn.executeSql('DROP TABLE IF EXISTS tb_kk_bantuan');
    txn.executeSql('DROP TABLE IF EXISTS tb_kk_bantuan_terima');
    txn.executeSql('DROP TABLE IF EXISTS tb_kk_nik');
    txn.executeSql('DROP TABLE IF EXISTS tb_nik');
    txn.executeSql('DROP TABLE IF EXISTS tb_status_kawin');
    txn.executeSql('DROP TABLE IF EXISTS tb_status_kk');
    txn.executeSql('DROP TABLE IF EXISTS tb_status_kk_nik');
    txn.executeSql('DROP TABLE IF EXISTS tb_user');
  });
  
}

export const SinkronisasiDataKeServer = () => {

}

export const ResetDataDariServer = () => {

}