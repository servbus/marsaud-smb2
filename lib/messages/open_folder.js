var SMB2Message = require('../tools/smb2-message'),
  message = require('../tools/message');
var constants = require('../structures/constants');

module.exports = message({
  generate: function(connection, params) {
    var buffer = Buffer.from(params.path, 'ucs2');

    return new SMB2Message({
      headers: {
        Command: 'CREATE',
        SessionId: connection.SessionId,
        TreeId: connection.TreeId,
        ProcessId: connection.ProcessId,
      },
      request: {
        Buffer: buffer,
        DesiredAccess: 0x001701df,
        FileAttributes: 0x00000000,
        ShareAccess: 0x00000007,
        CreateDisposition: constants.FILE_OPEN,
        CreateOptions: 0x00200021,
        NameOffset: 0x0078,
        CreateContextsOffset: 0x007a + buffer.length,
      },
    });
  },
});
