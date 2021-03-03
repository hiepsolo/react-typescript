import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'nodebook.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
            )
        } catch (error) {
            if (error.code === 'EADDRINUSE') {
                console.error(
                    'Port is in use. Try running on a different port.'
                );
            } else {
                console.log('Here the problem', error.message);
            }
            process.exit(1);
        }
    });
