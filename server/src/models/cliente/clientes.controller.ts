import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { AtualizarClienteDto } from './dto/atualizar-cliente.dto';
import { CriarClienteDto } from './dto/criar-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clienteService: ClientesService) { }

    @Post()
    @HttpCode(201)
    async criarCliente(@Body() criarClienteDto: CriarClienteDto, @Res() res: Response) {
        try {
            const result = await this.clienteService.criarCliente(criarClienteDto);
            if (result instanceof CustomBadRequests) {
                return res.status(HttpStatus.BAD_REQUEST).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    @HttpCode(200)
    async getClienteLogged(@Req() req: any) {
        try {
            return req.user;
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/profile')
    @HttpCode(200)
    async updateClienteLogged(@Body() atualizarClienteDto: AtualizarClienteDto, @Req() req: any, @Res() res: Response) {
        try {
            const result = await this.clienteService.atualizarCliente(atualizarClienteDto, req.user.id);
            if (result instanceof CustomBadRequests) {
                return res.status(HttpStatus.BAD_REQUEST).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.log(error);
            throw new HttpException("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/profile/avatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: 'uploads/',
            filename(req: any, file, callback) {
                const suffix = req.user.id;
                const ext = extname(file.originalname);
                const fileName = `${suffix}_avatar${ext}`;
                callback(null, fileName);
            },
        })
    }))
    @HttpCode(200)
    async editProfileAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
        console.log(file);
        await this.clienteService.atualizarAvatar(file.filename, req.user.id)
    }
}
