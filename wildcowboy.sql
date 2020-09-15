CREATE DATABASE cowboyDatabase;

USE svcn94uv5t83qq99v;

CREATE TABLE fincas (
    id int(255) auto_increment not null,
    nombre varchar (255) not null,
    direccion varchar (255) not null,
    updated datetime not null,
    CONSTRAINT pk_fincas PRIMARY KEY (id)
) ENGINE = InnoDb;

CREATE TABLE usuarios (
    id int(255) auto_increment not null,
    identificacion varchar (255) not null,
    username varchar (255) not null,
    nombre varchar (255) not null,
    apellidos varchar (255) not null,
    telefono varchar (255) not null,
    email varchar (255) not null,
    password varchar (255) not null,
    admin_finca int (255) not null,
    updated datetime not null,
    CONSTRAINT pk_usuarios PRIMARY KEY (id)
) ENGINE = InnoDb;

CREATE TABLE usuarios_fincas (
    id int(255) auto_increment not null,
    usuario_id int (255) not null,
    finca_id int (255) not null,
    updated datetime not null,
    CONSTRAINT pk_usuarios_fincas PRIMARY KEY (id),
    CONSTRAINT fk_usuario_finca FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_finca_usuario FOREIGN KEY (finca_id) REFERENCES fincas (id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE roles (
    id int(255) auto_increment not null,
    rol varchar (255) not null,
    finca_id int (255) not null,
    updated datetime not null,
    CONSTRAINT pk_roles PRIMARY KEY (id)
) ENGINE = InnoDb;

CREATE TABLE usuarios_roles (
    id int(255) auto_increment not null,
    usuario_id int (255) not null,
    rol_id int (255) not null,
    updated datetime not null,
    CONSTRAINT pk_usuarios_roles PRIMARY KEY (id),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    CONSTRAINT fk_rol_usuario FOREIGN KEY (rol_id) REFERENCES roles (id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE permisos (
    id int(255) auto_increment not null,
    nombre varchar (255) not null,
    codigo varchar (255) not null,
    updated datetime not null,
    CONSTRAINT pk_permisos PRIMARY KEY (id)
) ENGINE = InnoDb;

CREATE TABLE permisos_roles (
    id int(255) auto_increment not null,
    rol_id int (255) not null,
    permiso_id int (255) not null,
    updated datetime not null,
    CONSTRAINT pk_permisos_roles PRIMARY KEY (id),
    CONSTRAINT fk_permiso_rol FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    CONSTRAINT fk_rol_permiso FOREIGN KEY (rol_id) REFERENCES roles (id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE potreros (
    id int(255) auto_increment not null,
    finca_id int (255) not null,
    identificacion varchar (255) not null,
    nombre varchar (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_potreros PRIMARY KEY (id),
    CONSTRAINT fk_finca_potrero FOREIGN KEY (finca_id) REFERENCES fincas(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE animales (
    id int(255) auto_increment not null,
    potrero_id int (255) not null,
    identificacion varchar (255) not null,
    codigo varchar (255) not null,
    nombre varchar (255) not null,
    nacimiento datetime not null,
    comprado int(1) not null,
    madre_id int(255) null,
    padre_id int(255) null,
    padre_identificacion varchar (255) null,
    padre_nombre varchar (255) null,
    madre_identificacion varchar (255) null,
    madre_nombre varchar (255) null,
    vendedor_identificacion varchar (255) null,
    vendedor_nombre varchar (255) null,
    vendedor_telefono varchar (255) null,
    sexo varchar (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_animales PRIMARY KEY (id),
    CONSTRAINT fk_potrero_animal FOREIGN KEY (potrero_id) REFERENCES potreros(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE produccion_lechera (
    id int(255) auto_increment not null,
    animal_id int (255) not null,
    fecha date not null,
    cantidad float(10) not null,
    hora time not null,
    semana_del_year int (255) not null,
    dia_de_la_semana int (255) not null,
    momento_del_dia int (255) not null,
    registro_manual int (255) not null,
    observaciones varchar (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_produccion_lechera PRIMARY KEY (id),
    CONSTRAINT fk_produccion_animal FOREIGN KEY (animal_id) REFERENCES animales(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE inseminaciones (
    id int(255) auto_increment not null,
    animal_id int (255) not null,
    animal_donante_id int (255) null,
    donante_identificacion varchar (255) null,
    donante_nombre varchar (255) null,
    fecha datetime not null,
    observaciones varchar (255) not null,
    finca_id int (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_inseminacion PRIMARY KEY (id),
    CONSTRAINT fk_inseminacion_animal FOREIGN KEY (animal_id) REFERENCES animales(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE calores (
    id int(255) auto_increment not null,
    animal_id int (255) not null,
    fecha datetime not null,
    observaciones varchar (255) not null,
    en_calor int (10) not null,
    post_inseminacion int (10) not null,
    finca_id int (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_calores PRIMARY KEY (id),
    CONSTRAINT fk_calores_animal FOREIGN KEY (animal_id) REFERENCES animales(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE partos (
    id int(255) auto_increment not null,
    animal_id int (255) not null,
    fecha datetime not null,
    hijos int (255) not null,
    observaciones varchar (255) not null,
    finca_id int (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_partos PRIMARY KEY (id),
    CONSTRAINT fk_parto_animal FOREIGN KEY (animal_id) REFERENCES animales(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE enfermedades (
    id int(255) auto_increment not null,
    animal_id int (255) not null,
    enfermedad varchar (255) not null,
    sintomas varchar (255) not null,
    observaciones varchar (255) null,
    fecha datetime not null,
    finca_id int (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_enfermedades PRIMARY KEY (id),
    CONSTRAINT fk_enfermedad_animal FOREIGN KEY (animal_id) REFERENCES animales(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE botiquin (
    id int(255) auto_increment not null,
    finca_id int (255) not null,
    medicina varchar (255) not null,
    cantidad float (10) not null,
    unidades varchar (255) not null,
    alerta float (10) not null,
    presentacion varchar (255) not null,
    marca varchar (255) not null,
    observaciones varchar (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_botiquin PRIMARY KEY (id),
    CONSTRAINT fk_botiquin_finca FOREIGN KEY (finca_id) REFERENCES fincas(id) ON DELETE CASCADE
) ENGINE = InnoDb;

CREATE TABLE preguntas (
    id int(255) auto_increment not null,
    pregunta varchar (255) not null,
    tipo_respuesta int (255) not null,
    valor_alerta varchar (255) not null,
    comparacion_alerta int (255) not null,
    finca_id int (255) not null,
    updated datetime not null,
    usuario_id int (255) not null,
    CONSTRAINT pk_botiquin PRIMARY KEY (id),
    CONSTRAINT fk_botiquin_finca FOREIGN KEY (finca_id) REFERENCES fincas(id) ON DELETE CASCADE
) ENGINE = InnoDb;